import { UserServiceImpl } from "../../services/user.services";

export const DeleteUserUseCase = async (userId, token) => {
    try {
        const response = await UserServiceImpl.deleteUser(userId, token);
        return response;
    } catch (error) {
        console.error('An error occurred during user deletion:', error);
        throw new Error('Delete user failed, please try again.');

    }
}