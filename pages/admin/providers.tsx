import { useState, useEffect } from 'react';
import { AddOutlined, PeopleOutline } from '@mui/icons-material';
import useSWR from 'swr';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid, Box, Button } from '@mui/material';

import { AdminLayout } from '../../components/layouts';
import { IProvider } from '../../interfaces';
import { tesloApi } from '../../api';
import { Provider } from '../../models';

const ProvidersPage = () => {
  const { data, error } = useSWR<IProvider[]>('/api/admin/providers');
  const [providers, setProviders] = useState<IProvider[]>([]);

  useEffect(() => {
    if (data) {
      setProviders(data);
    }
  }, [data]);

  if (!data && !error) return <></>;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre de Empresa', width: 250 },
    { field: 'contact', headerName: 'Nombre de Contacto', width: 300 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'phone', headerName: 'Telefono', width: 300 },
    { field: 'address', headerName: 'Direccion', width: 300 },
    { field: 'city', headerName: 'Ciudad', width: 300 },
    { field: 'state', headerName: 'País', width: 300 },
  ];

  const rows = providers.map((provider: IProvider, index: number) => ({
    id: index + 1, // Assign a unique id to each row
    ...provider,
  }));

  return (
    <AdminLayout title={'Proveedores'} subTitle={'Mantenimiento de proveedores'} icon={<PeopleOutline />}>
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} color="secondary" href="/admin/providers/new">
          Crear proveedor
        </Button>
      </Box>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProvidersPage;
