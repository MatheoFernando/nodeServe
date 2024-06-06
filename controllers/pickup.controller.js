import { PrismaClient } from '@prisma/client';
import { sendMail } from '../services/pickup.service.js';

const prisma = new PrismaClient();

export const newPickup = async (req, res) => {
  const { nome, email, numero, endereco, cidade, date, produtos, hora } = req.body;
  console.log("Dados recebidos:", req.body);

  // Verificação de campos obrigatórios
  if (!nome || !email || !numero || !endereco || !cidade || !produtos || !date || !hora) {
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
    if (!produtos || produtos.length === 0) {
      return res.status(400).send({
        msg: 'É necessário o descarte de pelo menos um produto!',
      });
    }

    const formattedHora = `${hora.hour}:${hora.minute} ${hora.period}`;

    // Criação do registro de descarte
    const novoPickup = await prisma.pickup.create({
      data: {
        nome,
        email,
        numero,
        endereco,
        cidade,
        date,
        hora: formattedHora,
        produtos: {
          create: produtos.map(produto => ({
            nome: produto.nome,
          })),
        },
      },
    });

    // Envio de email com confirmação e prêmio
    await sendMail(novoPickup.email, novoPickup.nome, novoPickup.endereco, novoPickup.date, novoPickup.produtos , novoPickup.hora);

    // Resposta de sucesso
    return res.status(201).send({
      nome: novoPickup.nome,
      email: novoPickup.email,
      numero: novoPickup.numero,
      endereco: novoPickup.endereco,
      cidade: novoPickup.cidade,
      date: novoPickup.date,
      produtos: novoPickup.produtos,
      hora: novoPickup.hora,
      message: 'Pickup feito com sucesso!',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      msg: 'Erro interno do servidor. Por favor, tente novamente mais tarde.',
    });
  } finally {
    // Desconexão do Prisma Client
    await prisma.$disconnect();
  }
};
