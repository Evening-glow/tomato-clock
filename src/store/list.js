import { nanoid } from "nanoid";
const tomatoType = ['grow', 'ripe', 'nascent'];
const list = {
    namespaced: true,
    state: {
        todoList: JSON.parse(localStorage.getItem('todoList') || '[]'),
        activityList: JSON.parse(localStorage.getItem('activityList') || '[]'),
        recordsList: JSON.parse(localStorage.getItem('recordsList') || '[]')
    },
    actions: {
        //侧边栏添加事件，同时添加活动清单和待办
        addTodo(ctx, obj) {
            if (!ctx.state.todoList.some(i => i.thing == obj.thing)) {
                ctx.commit('ADD_TODO_LIST', obj);
            }
            if (!ctx.state.activityList.some(i => i.thing == obj.thing)) {
                ctx.commit('ADD_ACTIVITY_LIST', obj);
            }
        },
        //活动清单内临时添加列表，并添加备注
        addActivityList(ctx, obj) {
            if (!ctx.state.activityList.some(i => i.thing == obj.thing)) {
                ctx.commit('ADD_ACTIVITY_LIST', obj);
            }
        },
        //活动清单内重新排序待办清单
        changeTodoList(ctx, list) {
            //
            ctx.commit('CHANGE_TODO_LIST', list);
        },
        pushTodoList(ctx, thing) {
            ctx.commit('ADD_TODO_LIST', thing)
        },
        //点击改变todo的状态
        changeTodoState(ctx, id) {
            let a = ctx.state.todoList.find(i => i.id == id)
            a.isDone = !a.isDone;
        },
        changeActivityTomatoes(ctx, index) {
            ctx.commit('CHANGE_ACTIVITY_TOMATOES', index);
        },
        changeTodoTomatoesState(ctx, id) {
            let index1 = 0;
            let currentItem = ctx.state.todoList.find((item, index) => { index1 = index; return item.id == id });
            let index2 = currentItem.tomatoes.findIndex(i => i == 'gorw' || i == 'nascent');
            ctx.commit('CHANGE_TODO_STATE', { index1, index2 })
        },
        //添加todo 番茄后补
        addTodoTomato(ctx, id) {
            ctx.commit('ADD_TODO_TOMATO', id)
        }
    },
    mutations: {
        ADD_TODO_LIST(state, todo) {
            let { thing } = todo
            state.todoList.push({ id: nanoid(), thing, isDone: false, tomatoes: ['grow'] })
            this.commit('list/SAVE_LIST', 'todoList')
        },
        ADD_ACTIVITY_LIST(state, todoObj) {
            let { remarks, thing } = todoObj;
            state.activityList.push({ id: nanoid(), thing, remarks, tomatoes: ['grow'] })
            this.commit('list/SAVE_LIST', 'activityList')
        },
        //修改todo状态
        CHANGE_TODO_STATE(state, { index1, index2 }) {
            //由上一个红番茄开始将下一个番茄变为红番茄
            state.todoList[index1].tomatoes.splice(index2, 1, 'ripe');
            this.commit('list/SAVE_LIST', 'todoList')
        },
        //修改todo的番茄数
        CHANGE_ACTIVITY_TOMATOES(state, index) {
            state.activityList[index].tomatoes.push('grow');
            this.commit('list/SAVE_LIST', 'activityList');
        },
        //活动清单添加今日待办
        CHANGE_TODO_LIST(state, list) {
            state.todoList = list;
            this.commit('list/SAVE_LIST', 'todoList')
        },
        //添加 todolist tomato 
        ADD_TODO_TOMATO(state, id) {
            state.todoList.find(item => item.id == id).tomatoes.push('nascent')
            this.commit('list/SAVE_LIST', 'todoList')
        },
        SAVE_LIST(state, list) {
            localStorage.setItem(list, JSON.stringify(state[list]));
        },
    },
    getters: {}
}
export default list;