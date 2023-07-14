import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { name: contactName, email: contactEmail, message: contactMessage } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'food4them.chile@gmail.com',
        pass: 'tnabkvoqcsvnvsin',
      },
    });

    const mailOptions = {
      from: 'food4them.chile@gmail.com',
      to: contactEmail,
      subject: 'Nuevo mensaje de contacto',
      text: `Nombre: ${contactName}\nCorreo electrónico: ${contactEmail}\nMensaje: ${contactMessage}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'El correo electrónico se envió correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el correo electrónico' });
  }
}
