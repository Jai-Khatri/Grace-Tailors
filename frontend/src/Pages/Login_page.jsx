import { useState } from "react";
import useAuthStore from "../lib/useAuthStore.js";
import Navbar from "../Components/Navbar";
import { Navigate } from "react-router-dom";

const Login_page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated, error } = useAuthStore(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    try {
      await login({ email, password });
    } catch (error) {
      console.log("Error occurred:", error);
      setErrorMessage("Login failed. Please check your credentials."); 
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Login</h1>
        <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md" onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login_page;
