<template>
  <div class="todo-page">
    <ul>
      <todo-list-item
        v-for="(item, index) in list"
        :key="`todo_${index}`"
        :item="item"
        :index="index"
        :editting-index="edittingIndex"
        @on-edit="handleEdit"
        @on-cancel="handleCancel"
        @on-save="handleSave"
        @on-complete="handleComplete"
      >
      </todo-list-item>
      <a-button @click="turn">跳转</a-button>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoListItem from '../components/todo-list-item';
import { State, Mutation } from 'vuex-class';

interface Item {
  text: string;
  complete: boolean;
}

interface UpdateItem {
  index: number;
  content: string;
}

@Component({
  name: 'TodoPage',
  components: {
    TodoListItem,
  },
})
export default class Todo extends Vue {
  @State('todoList') public list!: Item;
  public edittingIndex = -1;
  @Mutation('updateTodoList') public updateList!: (obj: UpdateItem) => void;
  @Mutation('todoItemComplete') public handleComplete!: (index: number) => void;

  public handleSave({ index, content }: UpdateItem) {
    this.updateList({ index, content });
    this.handleCancel();
  }

  public handleEdit(index: number) {
    this.edittingIndex = index;
  }

  public handleCancel() {
    this.edittingIndex = -1;
  }

  public turn() {
    this.$router.push({
      name: 'Show',
    });
  }
}
</script>
