<template>
    <div class="todo">
        <el-input placeholder="输入待办事项" v-model="input" @keyup.enter.tirm.native="addTodoItem" :clearable="true">
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>
        <div class="list">
            <!-- <el-tooltip content="点击开始计时" placement="left" effect="light"> -->
            <div class="item" v-for="i in todoList" :key="i.id" :class="i.isDone ? 'isDone':''"
                @click="clockBegin(i.id)" title="点击开始计时">
                {{ i.thing }}
            </div>
            <!-- </el-tooltip> -->
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'todo-list',
    data() {
        return {
            input: ''
        }
    },
    computed: {
        ...mapState('list', ['todoList'])
    },
    methods: {
        ...mapActions('list', ['addTodo']),
        addTodoItem() {
            this.addTodo({ thing: this.input })
            this.input = ''
        },
        clockBegin(id) {
            this.$emit('itemclick', id);
        }
    }
}
</script>
<style lang="less">
@keyframes sidein {
    to {
        position: initial;
        top: initial;
        z-index: 1;
        background-color: rgba(255, 255, 255, 0.8);
    }
}

.isDone {
    text-decoration: line-through @main-color 2px;
}

.todo {
    .el-input {
        width: 25vw;
    }

    .list {
        margin-top: 20px;
        position: relative;
        overflow: hidden;

        .item {
            position: absolute;
            top: -80px;
            z-index: 5;
            margin-bottom: 1rem;
            background-color: @gray2;
            border: 2px solid @gray2;
            padding: 5px;
            animation-name: sidein;
            animation-fill-mode: forwards;
            animation-duration: 1s;
            animation-timing-function: ease-in-out;
            cursor: pointer;

            width: 25vw;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>