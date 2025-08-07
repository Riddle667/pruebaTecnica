import { api } from "../utilities/Api";

export const UserServiceImpl = {
  updateUser: async (userId, updatedUser, token) => {
    if (!userId || !updatedUser || !token) {
      throw new Error("User ID, updated user data, and token are required");
    }

    try {
      const response = await api.put(`/users/${userId}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update failed:", error);
      throw new Error("Update failed, please try again.");
    }
  },
  deleteUser: async (userId, token) => {
    if (!userId || !token) {
      throw new Error("User ID and token are required");
    }

    try {
      const response = await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Delete failed:", error);
      throw new Error("Delete failed, please try again.");
    }
  },
  getUsers: async () => {
    try {
      const response = await api.get("/users");
      console.log("Users fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch users failed:", error);
      throw new Error("Fetch users failed, please try again.");
    }
  },
};
