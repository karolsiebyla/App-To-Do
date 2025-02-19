//src/components/NewTask.tsx
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const queryClient = useQueryClient();

  const addTask = async () => {
    if (!title) return;
    await supabase.from("tasks").insert([{ title, completed }]);
    console.log(`Task added: ${title}, completed: ${completed}`);
    setTitle("");
    setCompleted(false);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return (
    <div className="p-4">
      <input
        className="border p-2"
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mr-2"
        />
        <label className="text-gray-700">Completed</label>
      </div>
      <button onClick={addTask} className="bg-blue-500 text-white p-2 ml-2 mt-2">Add</button>
    </div>
  );
};

export default NewTask;
