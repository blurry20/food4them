import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';


const DogPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?mascot=dog');


  return (
    <ShopLayout title={'FOOD4THEM-Shop - Dog'} pageDescription={'Encuentra los mejores productos para tu mejor amigo'}>
        <Typography variant='h1' component='h1'>Perros</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para perros</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

export default DogPage
