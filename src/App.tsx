import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTasks } from "./hooks/useTasks";
import NewTask from "./components/NewTask";
import Task from "./components/Task";
import EditTask from "./components/EditTask";
import { supabase } from "./supabaseClient";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
// import PrivateRoute from "./components/PrivateRoute"; // Usuwamy w pierwszym kroku PrivateRoute bo nie działa trasa przekierowania na /tasks z logowaniem na chwilę chcę samo /tasks

const App = () => {
  const { data: tasks, error, isLoading } = useTasks();
  const [editingTask, setEditingTask] = useState<{ id: number; title: string; completed: boolean } | null>(null);
  const queryClient = useQueryClient();

  const deleteTask = async (id: number) => {
    await supabase.from("tasks").delete().eq("id", id);
    console.log(`Task deleted: ${id}`);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Dodać trasę rejestracji */}
        <Route path="/" element={<Navigate to="/tasks" />} /> {/* Przekierowanie na /tasks */}
        <Route path="/tasks" element={
          // <PrivateRoute> // Usuń PrivateRoute
            <div>
              <h1 className="pl-10">Task List</h1>
              <NewTask />

              {editingTask !== null && (
                <EditTask 
                  taskId={editingTask.id} 
                  currentTitle={editingTask.title} 
                  currentCompleted={editingTask.completed} 
                  onClose={() => setEditingTask(null)} 
                />
              )}

              {tasks?.length ? (
                <ul>
                  {tasks.map((task) => (
                    <Task 
                      key={task.id} 
                      id={task.id} 
                      title={task.title} 
                      completed={task.completed} 
                      onEdit={() => setEditingTask({ id: task.id, title: task.title, completed: task.completed })} 
                      onDelete={() => deleteTask(task.id)} 
                    />
                  ))}
                </ul>
              ) : (
                <p>No tasks available</p>
              )}
            </div>
          // </PrivateRoute> // Usuń PrivateRoute
        } />
      </Routes>
    </Router>
  );
};

export default App;
