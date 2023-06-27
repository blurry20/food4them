import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';


const CatPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?mascot=cat');


  return (
    <ShopLayout title={'FOOD4THEM-Shop - Cat'} pageDescription={'Encuentra los mejores productos para tu gatito'}>
        <Typography variant='h1' component='h1'>Gatos</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para gatos</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

export default CatPage
