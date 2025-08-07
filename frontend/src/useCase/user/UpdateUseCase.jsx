import { UserServiceImpl } from '../../services/user.services';

export const UpdateUserUseCase = async (userId, updatedUser, token) => {
    try {
        const response = await UserServiceImpl.updateUser(userId, updatedUser, token);
        return response;
    } catch (error) {
        console.error('An error occurred during update:', error);
        throw new Error('Update failed, please try again.');
    }
    }