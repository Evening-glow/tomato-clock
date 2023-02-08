
const state = {
    step: 0.2,
    starttime: JSON.parse(localStorage.getItem('starttime') || '0'),
    overtime: JSON.parse(localStorage.getItem('overtime') || '0'),
    isRecord: JSON.parse(localStorage.getItem('isRecord') || 'false'),
    currentTime: JSON.parse(localStorage.getItem('currentTime') || '0'),
    beforeTime: JSON.parse(localStorage.getItem('beforeTime') || '0')
}
const mutations = {
    SET_STARTTIME(state, date) {
        state.starttime = date;
        this.commit('clock/SAVE_LOCALTION', 'starttime')
    },
    SET_OVERTIME(state, date) {
        state.overtime = date;
        this.commit('clock/SAVE_LOCALTION', 'overtime')
    },
    CHANGE_RECORD(state, status) {
        state.isRecord = status;
        this.commit('clock/SAVE_LOCALTION', 'isRecord')
    },
    SAVE_LOCALTION(state, key) {
        localStorage.setItem(key, state[key])
    },
    CHANGE_CURRENT_TIME(state, date) {
        state.currentTime = date;
        this.commit('clock/SAVE_LOCALTION', 'currentTime')
    },
    CHANGE_BEFORE_TIME(state, ms) {
        state.beforeTime = ms;
        this.commit('clock/SAVE_LOCALTION', 'beforeTime')
    }
}
const actions = {
    setOvertime(ctx, date) {
        if (!date) { return new Error('actions date 参数必须传递！') }
        ctx.commit('SET_OVERTIME', date)
    },
    setStarttime(ctx, date) {
        ctx.commit('SET_STARTTIME', date)
    },
    changeRecord(ctx, status) {
        ctx.commit('CHANGE_RECORD', status)
    },
    changeCurrentTime(ctx, date) {
        ctx.commit('CHANGE_CURRENT_TIME', date)
    },
    changeBeforeTime(ctx, ms) {
        ctx.commit('CHANGE_BEFORE_TIME', ms)
    }
}
const getters = {
    new_beforeTime(state) {
        return state.currentTime - state.starttime + state.beforeTime
    }
}
const clock = { namespaced: true, state, actions, mutations, getters }
export default clock;