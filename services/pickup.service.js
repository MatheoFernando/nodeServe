import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  type: "login",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
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

export async function sendMail(email, nome , endereco , produtos , hora , date) {
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
                          <p style="font-size:36px;line-height:38px;margin:20px 0;color:#254330;font-weight:400">Muito Obrigado (a)!</p>
                        </td>
                        <br>

                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>

          </table>
          <div>
            <h1 style="font-size:36px;line-height:38px;margin:20px 0;color:#254330;font-weight:400" >Detalhes da Solicitação:</h1>
        
              <ul style="font-size:16px;line-height:38px;margin:20px 0;color:#333e;font-weight:400">
               <li> Nome: ${nome}</li>
               <li> Endereço: ${endereco}</li>   
               <li> Endereço: ${date} as ${hora}</li>   
               <li> Endereço: ${produtos}</li>
          
              </ul>
            <p style="font-size:16px;line-height:28px;margin:20px 0;color:#000;font-weight:400">Nossa equipe de coleta estará no seu endereço na data e horário indicados. Se houver qualquer alteração ou dúvida, por favor, entre em contato conosco através do número +244 937 680 537 ou responda a este e-mail.</p>
           <p> Obrigado por contribuir para um futuro mais sustentável!</p>
<p>Atenciosamente,
Equipe Binewaste</p>
          </div>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody style="width:100%">
              <tr style="width:100%;">
              </tr>
            </tbody>
          </table>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc" />
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody style="width:100%">
              <tr style="width:100%">
                <td data-id="__react-email-column"><a
                    href="https://www.narisrec.co.ao/"><img alt="Narisrec Logo" height="64" src="https://www.narisrec.co.ao/assets/images/logo/logo-dark.png" style="display:block;outline:none;border:none;text-decoration:none"/></a>
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
      subject: "solicitação de recolha",
      text: `Olá ${nome}, Agradecemos por nos escolher para a recolha de seus resíduos eletrônicos. Sua solicitação foi recebida com sucesso!`,
      html: body,
    });

    console.log("Email enviado: %s", info.messageId);
  } catch (error) {
    console.log("Error ao enviar email", error);
  }
}
