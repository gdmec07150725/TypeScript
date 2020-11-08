import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [
      {
        text: '学习Typescript',
        complete: false,
      },
      {
        text: '学习ES6',
        complete: false,
      },
    ]
  },
  mutations: {
    updateTodoList(state, { index, content }) {
      state.todoList[index].text = content;
    },
    todoItemComplete(state, index) {
      state.todoList[index].complete = true;
    },
  },
  actions: {
  },
  modules: {
  },
});
