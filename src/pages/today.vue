<template>
    <div class="today">
        <el-table :data="todoList" border :stripe="true">
            <el-table-column min-width="50"></el-table-column>
            <el-table-column label="TO DO TODAY(今日待办)" min-width="180" header-align="center">
                <template slot-scope="scope">
                    <p class="todo-item" @click="changeState(scope.row.id)">
                        <span :class="scope.row.isDone ? 'isDone':''">{{scope.row.thing}}</span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="番茄数" header-align="center">
                <template slot-scope="scope">
                    <span v-for="tomato,index in scope.row.tomatoes" :key="index" class="tomato" :class="tomato"></span>
                    <el-button @click="addNascentTomato(scope.row.id)" size="mini" type="primary"
                        v-if="scope.row.tomatoes.indexOf('grow') == -1">reinforce
                        +</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState('list', ['todoList'])
    },
    methods: {
        ...mapActions('list', ['changeTodoState', 'addTodoTomato']),
        changeState(id) {
            this.changeTodoState(id);
        },
        addNascentTomato(id) {
            this.addTodoTomato(id);
        }
    },
    mounted() { }
}
</script>
<style lang="less">
.isDone {
    text-decoration: line-through @main-color 2px;
}

.tomato-container {
    display: flex;
    align-items: center;
    width: 100%;
}

.tomato {
    display: inline-block;
    width: 50./@vw;
    height: 50./@vw;
    background-size: cover;
    background-position: center;
}


.grow {
    background-image: url('../assets/hollow.png');
}

.ripe {
    background-image: url('../assets/ripe.png');
}

.nascent {
    background-image: url('../assets/nascent.png');
}
</style>