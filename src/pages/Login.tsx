import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../hooks/useAuth";

const Login = ({ handleLogout }: { handleLogout: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
  
    try {
      console.log("Attempting to sign in with email:", email);
      const { user, session } = await signIn(email, password);
      console.log("Sign in successful", { user, session });
  
      console.log("Navigating to home page...");
      navigate("/"); 
    } catch (error) {
      console.error("Sign in error:", error);
      if ((error as Error).message === "Email not confirmed") {
        setErrorMessage("Please confirm your email before logging in.");
      } else {
        setErrorMessage((error as Error).message);
      }
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Login</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Techniczny Log Out
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block w-full p-2 mb-2 border rounded"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="block w-full p-2 mb-2 border rounded"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign In
      </button>

      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default Login;
