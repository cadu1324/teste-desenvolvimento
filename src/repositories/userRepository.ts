import { error } from 'console';
import db from '../config/db';
import UserLoginBody from '../types/userTypes';
import jwt from 'jsonwebtoken';

const TOKEN_PASS = process.env.TOKEN_PASS || "sua_chave_secreta";
const TOKEN_EXPIRATION = "1h"; // Expiração do token

async function createUser(data: UserLoginBody): Promise<UserLoginBody | null> {
  try {
    const result = await db.query(
      `
      INSERT INTO "user" (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [data.name, data.email, data.password]
    );

    return result[0] || null;
  } catch (error: any) {
    console.error("Erro ao criar usuário no repository:", error);
    if (error.code === '23505') { 
      return null; 
    }
    throw error; 
  }
}

async function userLogin(body: UserLoginBody){
  try  {
    const result = await db.query(
      `
      SELECT id, name, email
      FROM "user"
      WHERE email = $1 
      AND password = MD5($2);
      `,
      [body.email, body.password]
    );

    if (result.length === 0) {
      throw new Error("Credenciais inválidas!"); 
    }

    const user = result[0];

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      TOKEN_PASS,
      { expiresIn: TOKEN_EXPIRATION }
    );

    return {name: user.name, token: `Bearer ${token}`} ; 
  } catch (error: any) {
    console.error("Erro ao logar:", error);
    if (error.code === '23505') { 
      return null; 
    }
    throw error; 
  }
}

async function updateUser(email: string, password: Partial<UserLoginBody['password']>) {
  try {
    const result = await db.query( 
      `
      UPDATE "user" 
      SET password = $1
      WHERE email = $2
      RETURNING *;
      `,
      [password, email]
    );

    return result || null; 
  } catch (error) {
    console.error("Erro ao atualizar usuário no repositório:", error);
    throw error;
  }
}

export default {
  createUser,
  userLogin,
  updateUser
};
