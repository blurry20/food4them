import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import WelcomeTemplate from "../../emails/WelcomeTemplate";
import { sendEmail } from "../../lib/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  
  if (req.method === 'POST') {
    await sendEmail({
      to: req.body.to,
      subject: req.body.subject,
      html: 
      `    <div>
      <h1>Hola ${req.body.name},</h1>
      <p>Los detalles de tu orden:</p>
      <p>ID de Orden: ${req.body.orderId}</p>
      <p>Dirección: ${req.body.address}, ${req.body.city}, ${req.body.country}</p>
      <p>Fono: ${req.body.phone}</p>
      <p>${req.body.order}</p>
    </div>`
    });
  }
  

  return res.status(200).json({ message: "Email sent successfully" });
}
