import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export default function WelcomeEmail() {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Esto es una prueba</Text>
          <br />
          <Text style={paragraph}>No respondas a este mensaje</Text>
          <Text style={paragraph}>Nombre del cliente</Text>
          <Text style={paragraph}>Detalles del pedido</Text>
          <Text style={paragraph}>Productos:</Text>
          <ul>
            <li>Producto 1</li>
            <li>Producto 2</li>
            <li>Producto 3</li>
          </ul>
          <Text style={paragraph}>Precio total:</Text>
          <Text style={paragraph}>Dirección de envío: </Text>
        </Container>
      </Section>
    </Html>
  );
}


// Styles for the email template
const main = {
  backgroundColor: "#ffffff",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};
