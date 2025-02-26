import { Request, Response } from 'express';
import service from '../services/userService';
import { gerarHashMD5 } from '../utils/generateHashMD5';

const createUser = async (req: Request, res: Response) => {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      password: gerarHashMD5(req.body.password), 
    };

    const user = await service.createUser(body); 

    if (user) {
      res.status(201).json({ status: 'ok', message: 'Usuário criado com sucesso!', user }); 
    } else {
      res.status(400).json({ status: 'error', message: 'Erro ao criar usuário. Email já cadastrado' });
    }
    return
  } catch (error) {
    console.error("Erro ao criar usuário no controller:", error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
    return
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };

    const auth = await service.login(body);

    if (auth) {
      res.status(200).json({ status: 'ok', message: 'Login Efetuado!', auth });
    } else {
      res.status(401).json({ status: 'error', message: 'Credenciais inválidas' });
    }
    return
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
    return
  }
};

const userUpdatePassword = async (req: Request, res: Response)=> {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      res.status(400).json({ status: 'error', message: 'Email e nova senha são obrigatórios' });
      return 
    }
    
    const hashedPassword = gerarHashMD5(newPassword); 

    await service.updatePassword(email, hashedPassword);

    res.status(200).json({ status: 'ok', message: 'Senha atualizada com sucesso' });

    return 
  } catch (error) {
    console.error("Erro na atualização de senha:", error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
    return 
  }
};

export default {
  createUser,
  userLogin,
  userUpdatePassword,
};