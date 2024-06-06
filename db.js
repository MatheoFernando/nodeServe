import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const databaseConnect = async () => {
  try {
    await prisma.$connect();
    console.log('Conectado ao banco de dados!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

export default databaseConnect;
export { prisma };
