import crypto from 'crypto'; 

export function gerarHashMD5(senha: string): string {
  return crypto.createHash('md5').update(senha).digest('hex');
}