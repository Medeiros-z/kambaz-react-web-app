import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, Form } from "react-bootstrap";
import { addTodo, deleteTodo, updateTodo } from "./todosReducer";

export default function TodoListRedux() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    dispatch(addTodo({ title: newTitle }));
    setNewTitle("");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleUpdate = (id: string) => {
    if (!editingTitle.trim()) return;
    dispatch(updateTodo({ id, title: editingTitle }));
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <div id="wd-todo-list-redux" className="container mt-4">
      <h2>Todo List Redux</h2>

      {/* Add Todo Form */}
      <ListGroup className="mb-3">
        <ListGroup.Item className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Add a new todo..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="me-2"
          />
          <Button
            variant="success"
            onClick={handleAdd}
            id="wd-todo-add-btn"
          >
            Add
          </Button>
        </ListGroup.Item>
      </ListGroup>

      {/* Todo Items */}
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroup.Item
            key={todo.id}
            className="d-flex align-items-center justify-content-between"
          >
            {editingId === todo.id ? (
              <>
                <Form.Control
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="me-2"
                />
                <Button
                  variant="warning"
                  onClick={() => handleUpdate(todo.id)}
                  id={`wd-todo-update-btn-${todo.id}`}
                >
                  Update
                </Button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <div>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEdit(todo.id, todo.title)}
                    id={`wd-todo-edit-btn-${todo.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(todo.id)}
                    id={`wd-todo-delete-btn-${todo.id}`}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
