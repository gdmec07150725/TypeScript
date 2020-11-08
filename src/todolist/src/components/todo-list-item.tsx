import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import './index.less';

interface Item {
  text: string;
  complete: boolean;
}
@Component({
  name: 'TodoListItem',
})
export default class TodoListItem extends Vue {
  @Prop(Object) public item!: Item;
  @Prop(Number) public index!: number;
  @Prop(Number) public edittingIndex!: number;

  public edittingContent = '';

  // 监听edittingIndex的数据变化
  @Watch('edittingIndex')
  public edittingChange(index) {
    if (index === this.index) {
      this.edittingContent = this.item.text;
    } else {
      this.edittingContent = '';
    }
  }

  public save(index, content, event) {
    event.stopPropagation();
    this.$emit('on-save', {index, content});
  }

  @Emit()
  public onEdit(event) {
    event.stopPropagation();
    return this.index;
  }

  public cancel(event) {
    event.stopPropagation();
    this.$emit('on-cancel');
  }

  public complete() {
    this.$emit('on-complete', this.index);
  }
  protected render() {
    return (
      <li class='item-wrap'>
        {
          this.edittingIndex === this.index
          ? (
            <div>
              <a-input v-model={this.edittingContent} style='width: 200px;'></a-input>
              <a-icon type='check' nativeOn-click={this.save.bind(this, this.index, this.edittingContent)}></a-icon>
              <a-icon type='close' nativeOn-click={this.cancel}></a-icon>
            </div>
          ) : (
            <div>
              <span on-click={this.complete} style={this.item.complete ? { textDecoration: 'line-through' } : {}}>
                { this.item.text }
              </span>
              <a-icon type='edit' nativeOn-click={this.onEdit}></a-icon>
            </div>
          )
        }
      </li>
    )
  }
}
