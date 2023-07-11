import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';


const BirdsPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?mascot=birds');


  return (
    <ShopLayout title={'FOOD4THEM-Shop - Birds'} pageDescription={'Encuentra los mejores productos para tus pajaritos'}>
        <Typography variant='h1' component='h1'>Aves</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para Aves</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

export default BirdsPage
