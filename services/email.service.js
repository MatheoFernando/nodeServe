import nodemailer from 'nodemailer';
import fs from 'fs';
import { promisify } from 'util';

const transporter = nodemailer.createTransport({
  type: 'login',
  host: process.env.SMTP_HOST,
  port:process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },

});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const readFileAsync = promisify(fs.readFile);

export async function sendMail(email, nome, premioSorteado) {
  let imageAttachment = '';
  switch (premioSorteado) {
    case 'Prêmio 1':
      imageAttachment = await readFileAsync('./public/caderno-fechado-verde-isolado-no-branco_118047-15924.jpg');
      break;
    case 'Prêmio 2':
      imageAttachment = await readFileAsync('./public/lapiseira-x-p-tampografia-verde-fdbp-dljk-source-br-c_h_f_pt-br.png');
      break;
    case 'Prêmio 3':
      imageAttachment = await readFileAsync('./public/pen_drive_giratorio_full_color_branco_47631_1_4b4d659f8a3014b41789d42a7b03bff0.webp');
      break;
    default:
      imageAttachment = '';
  }

  const body = `
  <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

<head>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
</head>
<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Narisrec<div>
  </div>
</div>

<body style="font-family:Ember,Helvetica,Arial,sans-seri;background-color:#ffffff">
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
    style="max-width:37.5em;border-top:8px solid #9cc025;margin:0 auto;padding:20px;">
    <tbody>
      <tr style="width:100%">
        <td>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody>
              <tr>
                <td>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody>
              <tr>
                <td>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td align="center" data-id="__react-email-column">
                          <p style="font-size:36px;line-height:48px;margin:20px 0;color:#232f3e;font-weight:400">Recompensa!</p>
                          <p style="font-size:14px;line-height:24px;margin:16px 0">Olá ${nome},Parabéns pela sua ação sustentável! Para agradecer, preparamos um presente especial para você. Entre em contato com a nossa equipe para receber o seu bônus exclusivo.</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody style="width:100%">
              <tr style="width:100%;">
                <img alt="Prêmio do sorteio" src="cid:premioUnique" style="display:block;outline:none;border:none;text-decoration:none;margin:0px auto;" width="300" />
                <h3 style="width:100;text-align:center;color:#9cc025;font-size:24px;">${premioSorteado}</h3>
              </tr>
            </tbody>
          </table>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc" />
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
          <tbody style="width:100%">
          <tr style="width:100%">
            <td data-id="__react-email-column"><a href="https://www.narisrec.co.ao/"><img alt="Narisrec Logo" height="64" src="https://www.narisrec.co.ao/assets/images/logo/logo-dark.png" style="display:block;outline:none;border:none;text-decoration:none"/></a>
            </td>
            <td align="right" data-id="__react-email-column">
              <a href="https://www.instagram.com/narisrec.ao/" style="text-decoration:none;filter: grayscale(0.4);">
                <img alt="Narisrec Instagram" height="30" src="https://static.cdninstagram.com/rsrc.php/v3/yI/r/VsNE-OHk_8a.png" style="display:inline-block;outline:none;border:none;text-decoration:none;margin-left:10px;border-radius:4px;" width="30" />
              </a>
              <a href="https://www.facebook.com/Narisrec" style="text-decoration:none;filter: grayscale(0.4);">
                <img alt="Narisrec Facebook" height="30" src="https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.ico?_nc_eui2=AeG83sa6hiRFZ1khznX1niHWrSiY817De8atKJjzXsN7xpsiNEBDZCX_yh7kifDv3W-1sldosatjmdqC-tp_uUuO" style="display:inline-block;outline:none;border:none;text-decoration:none;margin-left:10px;border-radius:4px;" width="30" />
              </a>
            </td>
          </tr>
        </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody>
              <tr>
                <td>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <p style="font-size:14px;line-height:24px;margin:8px 0;color:#666666">Sua contribuição faz toda
                          a diferença!
                        </p>
                        <a href="https://www.narisrec.co.ao/"
                          style="font-size:13px;line-height:24px;margin:8px 0;color:#666666;text-decoration:none;">©
                          2024 Narisrec.co.ao</a>
                      </tr> 
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;

  try {
    const info = await transporter.sendMail({
      from: `"Binwaste" <${process.env.SMTP_EMAIL}>`,
      to: email,
       bcc: process.env.SMTP_EMAIL ,
      subject: 'Recompensas por ação sustentavel',
      text: `Olá ${nome}, temos o prazer de
      informar que você foi o(a) grande vencedor(a) do nosso sorteio. Agradecemos a sua
      participação e o seu compromisso com a sustentabilidade, ao descartar seu eletrônico de
      forma responsável!`,
      html: body,
      attachments: [
        {
          filename: 'premio.jpg',
          content: imageAttachment,
          encoding: 'base64',
          type: 'image/jpg',
          cid: 'premioUnique',
        },
      ],
    });

    console.log('Email enviado: %s', info.messageId);
  } catch (error) {
    console.log('Error ao enviar email', error);
  }
}
