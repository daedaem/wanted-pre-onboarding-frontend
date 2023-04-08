import { useState, useRef } from "react";
import classes from "./TodoItem.module.css";
interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface TodoItemsProps {
  todoItem: TodoItem;
  onDelete: (id: number) => void;
  onUpdate: (id: number, todoText: string, isCompleted: boolean) => void;
}
const TodoItems: React.FC<TodoItemsProps> = ({
  todoItem,
  onDelete,
  onUpdate,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [todoText, setTodoText] = useState(todoItem.todo);
  const newTodoRef = useRef<HTMLInputElement>(null);
  const deleteTodoHandler = () => {
    onDelete(todoItem.id);
  };
  const updateTodoHandler = () => {
    setIsUpdate(() => true);
    const newTodo = newTodoRef.current?.value;
    if (!newTodo || newTodo.trim().length === 0) return;
    onUpdate(todoItem.id, newTodo, todoItem.isCompleted);
    setIsUpdate(() => false);
  };
  const todoCompleteHandler = () => {
    onUpdate(todoItem.id, todoItem.todo, !todoItem.isCompleted);
  };

  const todoContents = isUpdate ? (
    <>
      <input
        data-testid="modify-input"
        ref={newTodoRef}
        defaultValue={todoText}
      />
      <button data-testid="submit-button" onClick={updateTodoHandler}>
        제출
      </button>
      <button data-testid="delete-button" onClick={() => setIsUpdate(false)}>
        취소
      </button>
    </>
  ) : (
    <>
      <span>{todoItem.todo}</span>
      <button data-testid="modify-button" onClick={updateTodoHandler}>
        수정
      </button>
      <button data-testid="delete-button" onClick={deleteTodoHandler}>
        삭제
      </button>
    </>
  );
  return (
    <li className={classes.todo}>
      <label>
        <input
          type="checkbox"
          defaultChecked={todoItem.isCompleted}
          onClick={todoCompleteHandler}
        />
        {todoContents}
      </label>
    </li>
  );
};
export default TodoItems;