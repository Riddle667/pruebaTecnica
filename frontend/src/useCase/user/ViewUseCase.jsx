import { UserServiceImpl } from "../../services/user.services";

export const GetUsersUseCase = async () => {
    try {
        const response = await UserServiceImpl.getUsers();
        return response;
    } catch (error) {
        console.error('An error occurred during user retrieval:', error);
        throw new Error('User retrieval failed, please try again.');
    }
}
