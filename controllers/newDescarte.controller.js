import { PrismaClient } from '@prisma/client';
import { sendMail } from '../services/email.service.js';

const prisma = new PrismaClient();

export const newDescarte = async (req, res) => {
  const { nome, email, termo, descarte1, descarte2, descarte3 } = req.body;
  
  // Verificação de campos obrigatórios
  if (!nome || !email || !termo) {
    return res.status(400).send({
      msg: 'Todos os dados precisam ser preenchidos!',
    });
  }

  // Validação de formato de email
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({
      msg: 'Email inválido',
    });
  }

  try {
    // Verificação de pelo menos um produto descartado
    if (
      (!descarte1 && !descarte2 && !descarte3) ||
      (descarte1 == 0 && descarte2 == 0 && descarte3 == 0)
    ) {
      return res.status(400).send({
        msg: 'É necessário o descarte de pelo menos um produto!',
      });
    }
    
    // Seleção aleatória de prêmio
    const premios = ['Notebook', 'Lapiseira', 'USB'];
    const indiceSorteado = Math.floor(Math.random() * premios.length);
    const premioSorteado = premios[indiceSorteado];

    // Criação do registro de descarte
    const novoDescarte = await prisma.descarte.create({
      data: {
        nome,
        email,
        termo,
        descarte1,
        descarte2,
        descarte3,
        premioSorteado,
      },
    });

    // Envio de email com confirmação e prêmio
    await sendMail(novoDescarte.email, novoDescarte.nome, novoDescarte.premioSorteado);

    // Resposta de sucesso
    return res.status(201).send({
      nome: novoDescarte.nome,
      prêmio: novoDescarte.premioSorteado,
      message: 'Descarte feito com sucesso!',
    });
  }  finally {
    // Desconexão do Prisma Client
    await prisma.$disconnect();
  }
};
