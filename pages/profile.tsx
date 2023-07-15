import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { Typography, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { AdminLayout } from '../components/layouts';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AdminLayout title={'Perfil de Usuario'} subTitle={'Datos del Usuario'} icon={<AccountCircle />}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField
          label="Correo"
          value={user?.email}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            width: '50%',
            marginBottom: '16px',
            margin: '0 auto', // Center horizontally
          }}
          inputProps={{
            style: { textAlign: 'center', fontWeight: 300, padding: '8px 12px' },
          }}
          variant="outlined"
        />
        <Box sx={{ mb: 2 }} />
        <TextField
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: '50%',
            margin: '0 auto', // Center horizontally
          }}
          inputProps={{
            style: { textAlign: 'center', fontWeight: 300, padding: '8px 12px' },
          }}
          variant="outlined"
        />
      </Box>
    </AdminLayout>
  );
};

export default ProfilePage;