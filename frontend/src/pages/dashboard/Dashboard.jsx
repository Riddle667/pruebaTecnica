import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UpdateUserUseCase } from "../../useCase/user/UpdateUseCase";
import { DeleteUserUseCase } from "../../useCase/user/DeleteUseCase";
import { GetUsersUseCase } from "../../useCase/user/ViewUseCase";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({ id: null, name: "", email: "" });
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await GetUsersUseCase();
      setUsers(response.users || []);
    };
    fetchUsers();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    }

    const ws = new WebSocket("ws://localhost:8000/notifications");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const message = event.data;
      console.log("Notificación recibida:", message);
      toast.info(message); // Mostrar notificación
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleLogout = () => {
    if (!window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      return;
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditUser({ id: null, name: "", email: "" });
    setShowEditModal(false);
  };

  const handleEditSubmit = async () => {
    if (!editUser.name || !editUser.email) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const response = await UpdateUserUseCase(
      editUser.id,
      {
        name: editUser.name,
        email: editUser.email,
      },
      token
    );

    if (!response) {
      alert("Error al editar el usuario. Intente nuevamente.");
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === editUser.id ? { ...u, ...editUser } : u))
    );

    closeEditModal();
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }
    const response = await DeleteUserUseCase(userId, token);
    if (!response) {
      alert("Error al eliminar el usuario. Intente nuevamente.");
      return;
    }
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenido {user ? user.name : ""}
        </h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
        <div className="flex flex-col items-center justify-center mt-6">
          <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
          <table className="bg-white border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    {!showEditModal && (
                      <>
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded"
                          onClick={() => openEditModal(user)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Eliminar Usuario
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showEditModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                  onClick={closeEditModal}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleEditSubmit}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
