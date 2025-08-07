import { AuthServiceImpl } from "../../services/auth.services";

export const LoginUseCase = async (user) => {
    try {
        const response = await AuthServiceImpl.login(user);
        return response;

    } catch (error) {
        console.error('An error occurred during login:', error);
        throw new Error('Login failed, please try again.');
    }
}
