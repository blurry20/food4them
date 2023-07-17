import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Box, Button, Checkbox } from "@mui/material";
import { AdminLayout } from "../../components/layouts";
import { IProvider } from "../../interfaces";
import { Provider } from "../../models";
import axios from "axios";
import { AddOutlined, ContactMail, DeleteOutline, PeopleOutline } from "@mui/icons-material";
import { useRouter } from "next/router";

const ProvidersPage = () => {
  const router = useRouter();
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [deleteMessage, setDeleteMessage] = useState<string>("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("/api/admin/providers");
        setProviders(response.data.providers);
      } catch (error) {
        console.error("Error loading providers", error);
      }
    };

    fetchProviders();
  }, []);

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
    id: index + 1,
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
      setDeleteMessage("Proveedor eliminado exitosamente");
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting providers", error);
    }
  };

  const handleContact = () => {
    const selectedProvider = providers.find(
      (provider) => provider._id === selectedRows[0]
    );

    if (selectedProvider) {
      router.push({
        pathname: '/admin/providers/contact',
        query: {
          defaultName: selectedProvider.name,
          defaultEmail: selectedProvider.email,
        },
      });
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
        <Button
          startIcon={<ContactMail />}
          color="primary"
          onClick={handleContact}
          disabled={selectedRows.length !== 1}
        >
          Contactar
        </Button>
      </Box>
      {deleteMessage && (
        <Box sx={{ mb: 2 }}>
          <span style={{ color: "green" }}>{deleteMessage}</span>
        </Box>
      )}
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
