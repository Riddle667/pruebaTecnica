import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUseCase } from "../../useCase/auth/LoginUseCase";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginUseCase(user);
      await localStorage.setItem("user", JSON.stringify(response.user));
      await localStorage.setItem("token", response.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form
        className="space-y-4 bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Iniciar Sesión
        </button>
        <p className="text-sm text-gray-600 mt-2">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500">
            Registrar
          </a>
        </p>
      </form>
    </div>
  );
}
