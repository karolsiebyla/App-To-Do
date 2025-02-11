import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../hooks/auth";  

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setErrorMessage("");

    try {
      await signUp(email, password);
      console.log("Registration successful");
      navigate("/login"); 
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
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
        Register
      </button>

      <p className="mt-4">
        Already have an account? <Link to="/login" className="text-blue-500">Log in here</Link>
      </p>
    </form>
  );
};

export default Register;
