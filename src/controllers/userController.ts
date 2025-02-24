import { Request, Response } from 'express';
import service from '../services/userService';
import { gerarHashMD5 } from '../utils/generateHashMD5';

const userLogin = async (req: Request, res: Response) => {
  try {
    const body = {
      email: req.body.email,
      password: gerarHashMD5(req.body.password),
    };

    const user = await service.login(body);

    if (user) {
      return res.status(200).json({ status: 'ok', message: 'Login Efetuado!', user });
    } else {
      return res.status(401).json({ status: 'error', message: 'Credenciais inválidas' });
    }

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
};

const userUpdatePassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ status: 'error', message: 'Email e nova senha são obrigatórios' });
    }

    const hashedPassword = gerarHashMD5(newPassword); // Hash da nova senha com MD5

    await service.updatePassword(email, hashedPassword);

    return res.status(200).json({ status: 'ok', message: 'Senha atualizada com sucesso' });

  } catch (error) {
    console.error("Erro na atualização de senha:", error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
};

export default {
  userLogin,
  userUpdatePassword,
};