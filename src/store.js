import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  mutations: {
    createTask(state, task){
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updatedTask(state, {id, description, deadline}){
      const tasks = state.tasks.concat()
      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx]
      const status = new Date(deadline).getTime() > new Date().getTime() ? "active" : "oldest"
      tasks[idx] = {...task, deadline, description, status}
      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completedTask(state, id){
      const idx = state.tasks.findIndex(t => t.id === id)
      state.tasks[idx].status = "Завершено"
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    recoverTask(state, id){
      const idx = state.tasks.findIndex(t => t.id === id)
      state.tasks[idx].status = "active"
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task)
    },
    updatedTask({commit}, task) {
      commit('updatedTask', task)
    },
    completedTask({commit}, id) {
      commit('completedTask', id)
    },
    recoverTask({commit}, id) {
      commit('recoverTask', id)
    },
  },
  getters: {
    getTasks: (s) => s.tasks,
    getTask: s => id => s.tasks.find( t => t.id === id ),
    getChips: s => id => s.tasks.find( t => t.id === id ),
  }
})
