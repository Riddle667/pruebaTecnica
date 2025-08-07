import { AuthServiceImpl } from "../../services/auth.services";

export const RegisterUseCase = async (newUser) => {
    try {
        const response = await AuthServiceImpl.register(newUser);
        return response;
    } catch (error) {
        console.error('An error occurred during registration:', error);
        throw new Error('Registration failed, please try again.');
    }
}