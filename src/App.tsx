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
import PrivateRoute from "./components/PrivateRoute"; 

const App = () => {
  const { data: tasks, error, isLoading } = useTasks();
  const [editingTask, setEditingTask] = useState<{ id: number; title: string; completed: boolean } | null>(null);
  const queryClient = useQueryClient();

  const deleteTask = async (id: number) => {
    await supabase.from("tasks").delete().eq("id", id);
    console.log(`Task deleted: ${id}`);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const handleLogout = async () => { 
    console.log("Logging out user...");
    await supabase.auth.signOut();
    console.log("User logged out");
    window.location.href = "/login"; 
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login handleLogout={handleLogout} />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/" element={<Navigate to="/tasks" />} /> 
        <Route path="/tasks" element={
          <PrivateRoute> 
            <>
              <div className="flex justify-between items-center p-4"> 
                <h1 className="text-xl font-bold">Task List</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Log Out</button> 
              </div>
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
            </>
          </PrivateRoute> 
        } />
      </Routes>
    </Router>
  );
};

export default App;
