import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, TextField } from "@mui/material";
import { DriveFileRenameOutline, SaveOutlined } from "@mui/icons-material";
import { AdminLayout } from "../../../components/layouts";
import { IProvider } from "../../../interfaces/provider";
import Provider from "../../../models/Provider";
import tesloApi from "../../../api/tesloApi";

interface FormData extends IProvider {}

interface Props {
  provider: IProvider;
}

const ProviderForm = ({ provider }: Props) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: provider,
  });

  const onSubmit = async (form: FormData) => {
    try {
      setIsSaving(true);

      const { data } = await tesloApi({
        url: "/admin/providers",
        method: provider._id ? "PUT" : "POST",
        data: form,
      });

      console.log(data);

      if (!provider._id) {
        router.push("/admin/providers");;
      }

      setIsSaving(false);
    } catch (error) {
      console.log(error);
      setIsSaving(false);
      
    }
  };

  return (
    <AdminLayout
      title={provider._id ? "Editar Proveedor" : "Crear Proveedor"}
      subTitle={provider._id ? `ID: ${provider._id}` : ""}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type="submit"
            disabled={isSaving}
          >
            {provider._id ? "Guardar Cambios" : "Crear"}
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("name", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register("email", {
                required: "Este campo es requerido",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Contacto"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("contact", {
                required: "Este campo es requerido",
                min: { value: 0, message: "Mínimo de valor cero" },
              })}
              error={!!errors.contact}
              helperText={errors.contact?.message}
            />

            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("phone", {
                required: "Este campo es requerido",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("address", {
                required: "Este campo es requerido",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />

            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("city", {
                required: "Este campo es requerido",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />

            <TextField
              label="País"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("country", {
                required: "Este campo es requerido",
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
            />
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  if (!slug || slug === "new") {
    // Create a new provider
    const tempProvider: IProvider = {
      _id: "",
      name: "",
      email: "",
      contact: "",
      phone: "",
      address: "",
      city: "",
      country: "",
    };
    return {
      props: {
        provider: tempProvider,
      },
    };
  } else {
    try {
      const provider = await Provider.findById(slug).lean();

      if (!provider) {
        return {
          notFound: true,
        };
      }

      return {
        props: {
          provider,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        notFound: true,
      };
    }
  }
};

export default ProviderForm;