import db from '../config/db';
import UserLoginBody from '../types/userTypes';

async function userLogin(body: UserLoginBody) {
  return db.query(
    `
    SELECT id, name, email
    FROM user
    WHERE email = $1 AND password = MD5($2);
    `,
    [body.email, body.password],
  );
}

async function updateUser(email: string, data: Partial<UserLoginBody['password']>) {
  try {
    const result = await db.query( 
      `
      UPDATE "user" 
      SET password = $1
      WHERE email = $2
      RETURNING *;
      `,
      [data, email]
    );

    return result || null; // Retorna o usuário atualizado ou null se não encontrado
  } catch (error) {
    console.error("Erro ao atualizar usuário no repositório:", error);
    throw error;
  }
}

export default {
  userLogin,
  updateUser
};
