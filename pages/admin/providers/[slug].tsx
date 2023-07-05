import { GetServerSideProps } from "next";
import { IProvider } from "../../../interfaces/provider";
import Provider from "../../../models/Provider";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import tesloApi from "../../../api/tesloApi";
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, FormGroup, Checkbox, Chip, Card, CardMedia, CardActions } from "@mui/material";
import { AdminLayout } from "../../../components/layouts";

interface FormData {
  _id: string;
  name: string;
  email: string;
  contact: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

interface Props {
  provider: IProvider;
}

const ProviderForm = ({ provider }: Props) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTagValue, setNewTagValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>();

  const onSubmit = async (form: FormData) => {
    try {
      const { data } = await tesloApi({
        url: "/admin/providers",
        method: form._id ? "PUT" : "POST",
        data: form,
      });

      console.log(data);

      if (!form._id) {
        router.replace(`/admin/providers/${form._id}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout 
      title={'Provider'} 
      subTitle={`creando: ${provider.name}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button 
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >
            Crear 
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
              {...register('name', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
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
              {...register('email', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
  
            <TextField
              label="Contacto"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('contact', {
                required: 'Este campo es requerido',
                min: { value: 0, message: 'Mínimo de valor cero' }
              })}
              error={!!errors.contact}
              helperText={errors.contact?.message}
            />
  
            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('phone', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
  
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('address', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
  
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('city', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
  
            <TextField
              label="País"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('country', {
                required: 'Este campo es requerido',
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

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const { slug = "" } = query;

  if (slug === "new") {
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
    const providers = await Provider.find().lean();
    const provider = providers.find((p: IProvider) => p._id === slug) || null;

    if (!provider) {
      return {
        redirect: {
          destination: "/admin/providers/new",
          permanent: false,
        },
      };
    }

    return {
      props: {
        provider,
      },
    };
  }
};


export default ProviderForm;
