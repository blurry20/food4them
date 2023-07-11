import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import axios from 'axios';
// import { countries } from '../../utils';


const SummaryPage = () => {

    const router = useRouter();
    const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        if ( !Cookies.get('firstName') ) {
            router.push('/checkout/address');
        }
    }, [ router ]);
    

    const onCreateOrder = async() => {
        setIsPosting(true);

        const { hasError, message } = await createOrder(); 

        if ( hasError ) {
            setIsPosting(false);
            setErrorMessage( message );
            return;
        }

        router.replace(`/orders/${ message }`);

    }



    if ( !shippingAddress ) {
        return <></>;
    }

    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;

    const handleSubmit = (e: any) => {
        const mail = e.target[0].value
        const subject = e.target[1].value
        console.log(mail);
        return axios({
            method: 'post',
            url: '/api/send-email',
            data: {
              to: mail,
              subject: subject
            },
          });
        e.preventDefault();
    }

  return (
    <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItems} { numberOfItems === 1 ? 'producto':'productos' })</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        
                        <Typography>{ firstName } { lastName }</Typography>
                        <Typography>{ address }{ address2 ? `, ${address2}` : ''  } </Typography>
                        <Typography>{ city }, { zip }</Typography>
                        {/* <Typography>{ countries.find( c => c.code === country )?.name }</Typography> */}
                        <Typography>{ country }</Typography>
                        <Typography>{ phone }</Typography>

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                            <Button
                                color="secondary"
                                className='circular-btn'
                                fullWidth
                                onClick={ onCreateOrder }
                                disabled={ isPosting }
                            >
                                Confirmar Orden
                            </Button>


                            <Chip 
                                color="error"
                                label={ errorMessage }
                                sx={{ display: errorMessage ? 'flex':'none', mt: 2 }}
                            />


                        </Box>

                        <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                            <form onSubmit={handleSubmit}>
                                <input type="mail" placeholder='email'/>
                                <input type="text" placeholder='texto que saldra en mail'/>
                                <button type='submit'></button>
                            </form>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

export default SummaryPage;