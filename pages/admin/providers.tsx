import { useState, useEffect } from 'react';
import { AddOutlined, PeopleOutline } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box, Button } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';




const ProvidersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [ users, setUsers ] = useState<IUser[]>([]);


    useEffect(() => {
      if (data) {
          setUsers(data);
      }
    }, [data])
    

    if ( !data && !error ) return (<></>);

    


    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nombre de Empresa', width: 250},
        { field: 'contact', headerName: 'Nombre de Contacto', width: 300 },
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'phone', headerName: 'Telefono', width: 300},
        { field: 'address', headerName: 'Direccion', width: 300},
        { field: 'city', headerName: 'Ciudad', width: 300},
        { field: 'state', headerName: 'País', width: 300},
    
    ];

    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
    }))


  return (
    <AdminLayout 
        title={'Proveedores'} 
        subTitle={'Mantenimiento de proveedores'}
        icon={ <PeopleOutline /> }
    >

        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
                href="/admin/providers/new"
            >
                Crear proveedor
            </Button>
         </Box>
        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>


    </AdminLayout>
  )
}

export default ProvidersPage