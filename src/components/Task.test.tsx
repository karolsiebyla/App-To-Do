import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import Task from "./Task"; 

test("calls onDelete when delete button is clicked", async () => {
  const handleDelete = vi.fn(); 

    const queryClient = new QueryClient();

    render(
    <QueryClientProvider client={queryClient}>
      <Task id={1} title="Test Task" completed={false} onEdit={() => {}} onDelete={handleDelete} />
    </QueryClientProvider>
  );

  const deleteButton = screen.getByRole("button", { name: /delete/i });

  await userEvent.click(deleteButton);

  expect(handleDelete).toHaveBeenCalledTimes(1); 
});
