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
      <h1>Hello ${req.body.name},</h1>
      <p>Your order details:</p>
      <p>Order ID: ${req.body.orderId}</p>
      <p>Shipping Address: ${req.body.address}, ${req.body.city}, ${req.body.country}</p>
      <p>Phone: ${req.body.phone}</p>
      <p>Producto: ${req.body.order}</p>
    </div>`
    });
  }
  

  return res.status(200).json({ message: "Email sent successfully" });
}
