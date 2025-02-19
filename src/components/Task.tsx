import { supabase } from "../supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ id, title, completed, onEdit, onDelete }) => {
  const queryClient = useQueryClient();

  const toggleComplete = async () => {
    await supabase.from("tasks").update({ completed: !completed }).eq("id", id);
    console.log(`Task status updated: ${title}, completed: ${!completed}`);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return (
    <li data-id={id} className="flex items-center space-x-2 border-b p-2">
      <input type="checkbox" checked={completed} onChange={toggleComplete} />
      <span className={`${completed ? "line-through text-gray-500" : ""}`}>{title}</span>
      <button onClick={onEdit} className="bg-yellow-400 px-2 py-1 rounded text-white ml-auto">Edit</button>
      <button onClick={onDelete} className="bg-red-500 px-2 py-1 rounded text-white ml-2">Delete</button>
    </li>
  );
};

export default Task;
