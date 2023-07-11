import { AddOutlined, PeopleOutline, DeleteOutline } from "@mui/icons-material";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Box, Button, Checkbox } from "@mui/material";
import { AdminLayout } from "../../components/layouts";
import { IProvider } from "../../interfaces";
import axios from "axios";


const ProvidersPage = () => {
  const { data, error } = useSWR<{ providers: IProvider[] }>(
    "/api/admin/providers"
  );
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setProviders(data.providers);
    }
  }, [data]);

  if (error) return <div>Error loading providers</div>;

  const columns: GridColDef[] = [
    {
      field: "selection",
      headerName: "",
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <Checkbox
          color="primary"
          checked={selectedRows.includes(params.row._id)}
          onChange={() => handleRowSelection(params.row._id)}
        />
      ),
    },
    { field: "name", headerName: "Nombre de Empresa", width: 250 },
    { field: "contact", headerName: "Nombre de Contacto", width: 300 },
    { field: "email", headerName: "Correo", width: 250 },
    { field: "phone", headerName: "Telefono", width: 300 },
    { field: "address", headerName: "Direccion", width: 300 },
    { field: "city", headerName: "Ciudad", width: 300 },
    { field: "state", headerName: "País", width: 300 },
  ];

  const rows = providers.map((provider: IProvider, index: number) => ({
    id: index + 1, // Assign a unique id to each row
    ...provider,
  }));

  const handleRowSelection = (providerId?: string) => {
    if (providerId) {
      if (selectedRows.includes(providerId)) {
        setSelectedRows(selectedRows.filter((id) => id !== providerId));
      } else {
        setSelectedRows([...selectedRows, providerId]);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/api/admin/providers", {
        data: { selectedRows },
      });
      const remainingProviders = providers.filter(
        (provider) => !selectedRows.includes(provider._id)
      );
      setProviders(remainingProviders);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting providers", error);
    }
  };

  return (
    <AdminLayout
      title={"Proveedores"}
      subTitle={"Mantenimiento de proveedores"}
      icon={<PeopleOutline />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/providers/new"
        >
          Crear proveedor
        </Button>
        <Button
          startIcon={<DeleteOutline />}
          color="error"
          onClick={handleDelete}
          disabled={selectedRows.length === 0}
        >
          Eliminar
        </Button>
      </Box>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProvidersPage;
