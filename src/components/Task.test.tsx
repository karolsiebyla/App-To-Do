import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Task from "./Task";

const TasksList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: false },
  ]);

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <QueryClientProvider client={new QueryClient()}>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} completed={task.completed} onEdit={() => {}} onDelete={() => handleDelete(task.id)} />
        ))}
      </ul>
    </QueryClientProvider>
  );
};

test("removes Task from the list when delete button is clicked", async () => {
  render(<TasksList />);

  // Pobieramy listę zadań przed usunięciem
  const tasksBefore = screen.getAllByRole("listitem");
  expect(tasksBefore.length).toBe(2);

  // Klikamy "Delete" na pierwszym zadaniu
  const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
  await userEvent.click(deleteButtons[0]);

  // Czekamy na usunięcie elementu
  await new Promise((r) => setTimeout(r, 100));

  // Pobieramy listę zadań po usunięciu
  const tasksAfter = screen.queryAllByRole("listitem");
  expect(tasksAfter.length).toBe(1);
});





// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { vi } from "vitest";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
// import Task from "./Task"; 

// test("calls onDelete when delete button is clicked", async () => {
//   const handleDelete = vi.fn(); 

//     const queryClient = new QueryClient();

//     render(
//     <QueryClientProvider client={queryClient}>
//       <Task id={1} title="Test Task" completed={false} onEdit={() => {}} onDelete={handleDelete} />
//     </QueryClientProvider>
//   );

//   const deleteButton = screen.getByRole("button", { name: /delete/i });

//   await userEvent.click(deleteButton);

//   expect(handleDelete).toHaveBeenCalledTimes(1); 
// });

