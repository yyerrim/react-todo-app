import {
  MdCheckBoxOutlineBlank, MdRemoveCircleOutline,
  MdCheckBox
} from 'react-icons/md';
import styles from './TodoListItem.module.css';
import { ChangeContext } from '../Context';

const TodoListItem = (props) => {

  const { id, text, checked } = props.todo;

  return (
    <div className={styles.TodoListItem}>

      {/* <div className={
        checked ? `${styles.checkbox} ${styles.checked}`
          : styles.checkbox}
        onClick={() => props.onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />
        }
        <div className={styles.text}>{text}</div>
      </div> */}

      {/* PDF 10 */}
      <div className={
        checked ? `${styles.checkbox} ${styles.checked}`
          : styles.checkbox}
        onClick={() => props.onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />
        }
        <div className={styles.text}>{text}</div>
        <ChangeContext.Consumer>
          {
            (value) => {
              return <span>{value}</span>
            }
          }
        </ChangeContext.Consumer>
        {/* App.js에 ChangeContext를 정의해놨기 때문에 여기에 불러쓸 수 없음 ===> 오류 발생 */}
        {/* 따로 ChangeContext.js 파일 생성 */}
      </div>

      <div className={styles.remove} onClick={() => {
        props.onRemove(id);
      }}>
        <MdRemoveCircleOutline></MdRemoveCircleOutline>
      </div>
    </div>
  );
};
export default TodoListItem;