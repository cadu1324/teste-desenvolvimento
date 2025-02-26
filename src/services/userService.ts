import userRepository from '../repositories/userRepository';
import UserLoginBody from '../types/userTypes'; 

async function createUser(data: UserLoginBody): Promise<UserLoginBody | null> {
  try {
    const user = await userRepository.createUser(data);
    return user;
  } catch (error) {
    console.error("Erro ao criar usuário na service:", error);
    throw error; 
  }
}


async function login(body: UserLoginBody) {
  try {
    const user = await userRepository.userLogin(body); 
    return user; 

  } catch (error) {
    console.error('Erro ao fazer login na service:', error);
    throw error; 
  }
}

async function updatePassword(email: string, password: Partial<UserLoginBody['password']>) {
  try {
    const updatedUser = await userRepository.updateUser(email, password);
    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar usuário na service:", error);
    throw error;
  }
}

export default {
  createUser,
  login,
  updatePassword
};