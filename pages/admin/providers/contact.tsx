import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const ContactPage = () => {
  const router = useRouter();

  const { defaultName, defaultEmail } = router.query;

  const [contactName, setContactName] = useState(defaultName || '');
  const [contactEmail, setContactEmail] = useState(defaultEmail || '');
  const [contactMessage, setContactMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', {
        name: contactName,
        email: contactEmail,
        message: contactMessage,
      });

      setSuccessMessage('El correo electrónico se envió correctamente');
      setContactName('');
      setContactEmail('');
      setContactMessage('');

      router.push('/admin/providers');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al enviar el correo electrónico');
    }
  };

  return (
    <Box maxWidth={400} margin="auto">
      <h2>Contacto</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Correo electrónico"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mensaje"
          value={contactMessage}
          onChange={(e) => setContactMessage(e.target.value)}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </Box>
  );
};

export default ContactPage;

