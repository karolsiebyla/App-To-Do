//src/components/EditTask.tsx
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

interface EditTaskProps {
  taskId: number;
  currentTitle: string;
  currentCompleted: boolean;
  onClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ taskId, currentTitle, currentCompleted, onClose }) => {
  const [title, setTitle] = useState(currentTitle);
  const [completed, setCompleted] = useState(currentCompleted);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleUpdate = async () => {
    if (!title.trim()) return;

    setLoading(true);
    await supabase.from("tasks").update({ title, completed }).eq("id", taskId);
    console.log(`Task updated: ${title}, completed: ${completed}`);
    setLoading(false);
    queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Odświeżenie danych po zapisaniu edycji
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <input
          className="border p-2 w-full"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Completed</label>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
