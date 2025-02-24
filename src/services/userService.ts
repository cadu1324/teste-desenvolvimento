import userRepository from '../repositories/userRepository'; // Importe o repositório
import UserLoginBody from '../types/userTypes'; // Importe o tipo do body

async function login(body: UserLoginBody) {
  try {
    const user = await userRepository.userLogin(body); // Chama a função do repositório

    return user; // Retorna o usuário (ou null se não encontrado)

  } catch (error) {
    console.error('Erro ao fazer login na service:', error);
    throw error; // Re-lança o erro para ser tratado no controller
  }
}

async function updatePassword(email: string, data: Partial<UserLoginBody['password']>) {
  try {
    const updatedUser = await userRepository.updateUser(email, data);
    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar usuário na service:", error);
    throw error;
  }
}

export default {
  login,
  updatePassword
};