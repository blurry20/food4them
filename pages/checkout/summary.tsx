import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import { AuthContext } from '../../context/auth/AuthContext';
import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Title } from '@mui/icons-material';

const SummaryPage = () => {
    const { user } = useContext(AuthContext);
    const { email } = user || {};

    const router = useRouter();
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { data: userData, error } = useSWR<IUser[]>('/api/admin/users');

    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address');
        }
    }, [router]);

    const onCreateOrder = async () => {
        setIsPosting(true);

        const { hasError, message } = await createOrder();

        if (hasError) {
            setIsPosting(false);
            setErrorMessage(message);
            return;
        }

        router.replace(`/orders/${message}`);

        const subject = 'Su orden ' + message + ' ha sido recibida';
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Invoice', 10, 10);

        doc.setFontSize(12);
        doc.text(`Order ID: ${message}`, 10, 20);
        doc.text(`Customer: ${firstName} ${lastName}`, 10, 30);
        doc.text(`Address: ${address}, ${city}, ${zip}, ${country}`, 10, 40);
        doc.text(`Phone: ${phone}`, 10, 50);
        

        // Loop through cart items and add them to the PDF
        let startY = 60;

        doc.save('summary.pdf');

        return axios({
            method: 'post',
            url: '/api/send-email',
            data: {
                to: email,
                subject: subject,
                name: firstName,
                name2: lastName,
                orderId: message,
                address: address,
                address2: address2,
                city: city,
                country: country,
                phone: phone,
                zip: zip,
                order: message
            }
        });
    };

    if (!shippingAddress) {
        return <></>;
    }

    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;

    return (
        <ShopLayout title="Resumen de orden" pageDescription={'Resumen de la orden'}>
            <Typography variant="h1" component="h1">
                Resumen de la orden
            </Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItems} { numberOfItems === 1 ? 'producto':'productos' })</Typography>                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Dirección de entrega</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography>{firstName} {lastName}</Typography>
                            <Typography>{address}{address2 ? `, ${address2}` : ''}</Typography>
                            <Typography>{city}, {zip}</Typography>
                            <Typography>{country}</Typography>
                            <Typography>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                                <Button
                                    color="secondary"
                                    className="circular-btn"
                                    fullWidth
                                    onClick={onCreateOrder}
                                    disabled={isPosting}
                                >
                                    Confirmar Orden
                                </Button>

                                <Chip
                                    color="error"
                                    label={errorMessage}
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default SummaryPage;