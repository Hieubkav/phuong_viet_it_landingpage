"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@dohy/backend/convex/_generated/api";
import type { Id } from "@dohy/backend/convex/_generated/dataModel";

export default function Home() {
  const todos = useQuery(api.todos.list);
  const createTodo = useMutation(api.todos.create);
  const toggleTodo = useMutation(api.todos.toggle);
  const removeTodo = useMutation(api.todos.remove);
  const [text, setText] = useState("");
  const isLoading = todos === undefined;

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    await createTodo({ text: trimmed });
    setText("");
  };

  const handleToggle = async (id: Id<"todos">) => {
    await toggleTodo({ id });
  };

  const handleRemove = async (id: Id<"todos">) => {
    await removeTodo({ id });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold">Todos</h1>
      <form onSubmit={handleCreate} className="mb-6 flex gap-2">
        <input
          className="flex-1 rounded-md border px-3 py-2"
          placeholder="Add a new todo..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          disabled={!text.trim()}
        >
          Add
        </button>
      </form>

      <section className="rounded-lg border px-4 py-3">
        <h2 className="mb-3 text-lg font-medium">Current todos</h2>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : todos?.length ? (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo._id)}
                  />
                  <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
                    {todo.text}
                  </span>
                </label>
                <button
                  className="text-sm text-destructive"
                  onClick={() => handleRemove(todo._id)}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No todos yet. Create your first one above.</p>
        )}
      </section>
    </div>
  );
}
