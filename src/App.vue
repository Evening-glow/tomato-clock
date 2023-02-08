<template>
  <el-container>
    <el-aside width="30vw">
      <todoList @itemclick="clockStart"></todoList>
    </el-aside>
    <el-container>
      <el-header>
        <router-link to="/home">计时器</router-link>
        <router-link to="/activity">活动清单</router-link>
        <router-link to="/today">今日待办</router-link>
        <router-link to="/records">记录表</router-link>
      </el-header>
      <el-main>
        <router-view></router-view>
        <div class="clock" v-show="clockContrl">
          <div class="inner">{{clock.hour | showTwoNumber}}:{{clock.min | showTwoNumber}}:{{clock.second |
          showTwoNumber}}</div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import todoList from './components/todo-list'
export default {
  name: 'App',
  components: { todoList },
  filters: {
    showTwoNumber(value) {
      return value > 9 ? value : '0' + value
    }
  },
  data() {
    return {
      timer: null,
      clock: {
        hour: 0,
        min: 0,
        second: 0
      },
      currentId: ''
    }
  },
  computed: {
    stepMilliseconds() {
      return this.step * 60000;
    },
    ...mapState('clock', ['overtime', 'isRecord', 'starttime', 'step', 'currentTime', 'beforeTime']),
    ...mapState('list', ['todoList']),
    ...mapGetters('clock', ['new_beforeTime']),
    //显示时钟
    clockContrl() {
      let path = this.$route.path;
      return !path.includes('activity') && !path.includes('records') && !path.includes('today');
    }
  },
  methods: {
    ...mapActions('clock', ['changeRecord', 'setStarttime', 'setOvertime', 'changeBeforeTime', 'changeCurrentTime']),
    ...mapActions('list', ['changeTodoTomatoesState']),
    clockStart(id) {
      if (this.isRecord) {
        return this.$message({
          message: '当前计时器还未结束',
          type: 'error'
        });
      }

      this.currentId = id;
      let currentItem = this.todoList.find(item => item.id == id);
      //判断当前项是否已完成
      if (currentItem.isDone) { return this.$message({ message: '该项已完成', type: 'error' }) }
      //判断番茄数是否足够
      if (!currentItem.tomatoes.some(i => i == 'grow' || i == 'nascent')) {
        return this.$message({
          message: '该项番茄数已完成',
          type: 'error'
        })
      }
      let time = new Date().getTime();
      this.changeRecord(true);
      console.log('currentid:', id)
      //将开始时间存储在vuex
      this.setStarttime(time)
      this.setOvertime(time + this.step * 60000)

      //开始计时
      this.showClock();
    },
    showClock() {
      this.timer = setInterval(() => {
        //结束时间 - 当前时间 = 剩余时间
        let now = new Date().getTime();
        let last = this.overtime - now;

        //如果剩余时间为0，移除计时器
        if (last <= 0) {
          this.changeRecord(false)
          this.changeBeforeTime(0)
          //修改番茄状态
          this.changeTodoTomatoesState(this.currentId);
          alert('计时结束')
          return clearInterval(this.timer)
        }

        //将last转为时分秒
        let hour = Math.floor(last / 3600000)
        let min = Math.floor(last / 60000 - hour * 60)
        let second = Math.floor(last / 1000 - min * 60)

        this.clock = {
          hour, min, second
        }
        this.changeCurrentTime(now)
      }, 1000)
    }
  },
  mounted() {
    if (this.isRecord) {
      //上一次的计时未完成,继续上次的计时
      //计算已经过去的时间
      let new_beforeTime = this.new_beforeTime;
      this.changeBeforeTime(new_beforeTime)
      let starttime = new Date().getTime()
      this.setStarttime(starttime)
      let overtime = (this.starttime + this.step * 60000) - new_beforeTime;
      //将开始时间存储在vuex
      this.setOvertime(overtime)
      //开始计时
      this.showClock();
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
@media (max-width:540px) {
  .el-aside {
    background-position: top right -245px !important;
  }
}

@media (max-width:300px) {
  .el-aside {
    background-position: top right 15% !important;
  }
}

@media (min-height:1073px) {
  .el-aside {
    background-size: cover;
  }

  .clock {
    height: 20% !important;
  }
}

.el-aside {
  padding-top: 40px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('./assets/bg.jpg');
  background-position: top right 18%;
  background-repeat: no-repeat;
  overflow-y: scroll;
}

.el-container {
  .el-container {
    height: 100vh;

    .el-header {
      background-color: @header-bg-color;
    }

    .el-main {
      padding: 0;
      flex: 1;
      background-color: @bg-color;
      position: relative;

      .clock {
        width: 50%;
        height: 30%;
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 600./@vw;
        min-height: 400./@vw;
        background-image: @clock-outside-bg;
        box-shadow: @clock-shadow;
        border-radius: 15px;
        padding: 2rem;
        transform: translate(-50%, -50%);

        .inner {
          font-size: 120./@vw;
          font-weight: bold;
          color: @clock-number-color;
          padding: 1rem;
          height: 100%;
          box-sizing: border-box;
          border-radius: 10px;
          background-image: @clock-inner-bg;
          box-shadow: @clock-inner-shadow;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
      padding: 5px;
      color: #333;
      text-decoration: none;

      &:hover {
        color: @main-color;
      }
    }

  }
}
</style>
