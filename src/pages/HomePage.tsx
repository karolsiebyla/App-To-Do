//src/pages/HomePage.tsx
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logging out user...");
    await supabase.auth.signOut();
    console.log("User logged out");
    navigate("/login"); // Przekierowanie do strony logowania po wylogowaniu
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Log Out
      </button>
    </div>
  );
};

export default HomePage;
