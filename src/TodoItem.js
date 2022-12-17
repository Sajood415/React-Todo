function TodoItem({ todo }) {
    return (
      <div className="todo">
        <span>{todo.taskText}</span>
      </div>
    );
  }

  export default TodoItem