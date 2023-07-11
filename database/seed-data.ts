import bcrypt from 'bcryptjs';
import { Provider } from '../models';

interface SeedProduct {
    description: string;
    brand: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    mascot: 'dog'|'cat'|'birds'|'exotics';
}
interface SeedProvider {
    name: string;
    email: string;
    contact: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  }
interface SeedUser {
    name     : string;
    email    : string;
    password : string;
    role     : 'admin'|'client'
}

type ValidSizes = '5kg'|'10kg'|'15kg'|'20kg'|'25kg'|'30kg'|'35kg'|'40kg'|'45kg'|'50kg'
type ValidTypes = 'alimento'|'juguete'|'accesorios';





interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
    providers: SeedProvider[];
}





export const initialData: SeedData = {
    providers:[
        {
            name:'Proveedor la Pincoya',
            email: 'pincoya@mail.com',
            contact:'Pincorio',
            phone:'99999999999999',
            address:'av la piconya ',
            city:'pinmcoya',
            country:'shile'

        }
    ],
    users: [
        {
            name: 'Admin',
            email: 'admin@admin.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
        {
            name: 'Cliente',
            email: 'cliente@cliente.com',
            password: bcrypt.hashSync('123456'),
            role: 'client'
        },
    ],
    products: [
        {
        description: "Alimento completo y balanceado recomendado para tu Master Dog Adulto Razas Medianas y Grandes, desde los 18 meses hasta los 7 años. Contiene Omega 3 para una piel sana y pelaje brillante. Además contiene proteínas de alta calidad, vitaminas y minerales que tu Master Dog necesita para mantenerse fuerte y saludable.",
        brand: "Master Dog",
        images: [
            'Alimento-perro-adulto-carne-15-kg.jpg',
            'zoomed-1.png',
        ],
        inStock: 7,
        price: 25890,
        sizes: ['5kg','10kg','15kg','20kg','25kg','30kg','35kg','40kg','45kg','50kg'],
        slug: "alimento-perro-adulto-carne-15-kg",
        type: 'alimento',
        tags: ['alimento'],
        title: "Alimento perro adulto carne 15 kg",
        mascot: 'dog'
    },
    {
        description: "Delicioso alimento húmedo completo y balanceado para gatos adultos, compuesto por trocitos de atún en salsa, para deleitar hasta al paladar gatuno más exigente.",
        brand: "Felix",    
        images: [
            'Alimento-humedo-gato-sensaciones-de-atun-en-salsa-85-g.png',
            'zoomed-2.png',
        ],
        inStock: 7,
        price: 890,
        sizes: ['5kg','10kg','15kg','20kg','25kg','30kg','35kg','40kg','45kg','50kg'],
        slug: "alimento-humedo-gato-sensaciones-de-atun-en-salsa-85-g",
        type: 'alimento',
        tags: ['alimento'],
        title: "Alimento húmedo gato Sensaciones de atún en salsa 85 g",
        mascot: 'cat'
    },
    
    {
        description: "Mazuri® Large Bird Diet es un alimento completo, extruido formulado para loros grandes como guacamayos, yacos, amazonas, africanos, cacatúas, rosellas, entre otros. Contiene pellets de distinto tamaño y forma que estimulan el consumo, instinto y conducta de juego. Además son suplementados con pigmentos naturales para que realcen los colores del plumaje, antioxidantes y vitaminas.",
        brand: "Mazuri",
        images: [
            'alimento-mazuri-large-bird-diet-alimento-para-aves-grandes.jpg',
            'zoomed-3.png',
        ],
        inStock: 7,
        price: 25890,
        sizes: ['5kg','10kg','15kg','20kg','25kg','30kg','35kg','40kg','45kg','50kg'],
        slug: "alimento-mazuri-large-bird-diet-alimento-para-aves-grandes",
        type: 'alimento',
        tags: ['alimento'],
        title: "Alimento MAZURI Large Bird Diet para Aves Grandes",
        mascot: 'birds'
    },

    {
        description: "Alimento para Loros 1kg y 3 kg Premium Line, es un pienso completo y equilibrado adecuado específicamente para la alimentación de loros de cualquier tipo. Es un alimento rico en proteínas y aminoácidos esenciales.",
        brand: "Cunipic",
        images: [
            'Loros-cara-min.png',
            'zoomed-4.png',
        ],
        inStock: 7,
        price: 25890,
        sizes: ['5kg','10kg','15kg','20kg','25kg','30kg','35kg','40kg','45kg','50kg'],
        slug: "loros-cara-min",
        type: 'alimento',
        tags: ['alimento'],
        title: "Cunipic Alimento Completo para Loros",
        mascot: 'birds'
    },
    {
        description: "Pack 3 Juguetes para perro con sonido diseños de huesos. Mordedores de colores con diseño de huesos en relieve.Juguete de entretención para morder, su diseño en relieve permite una mejor sensación en la boca y sirve para rascar el paladar o la lengua de su mascota . 2 Colores Distintos",
        brand: "Generico",
        images: [
            'juguete perro.jpg',
            'zoomed-5.png',
        ],
        inStock: 7,
        price: 2990,
        sizes: ['5kg','10kg','15kg','20kg','25kg','30kg','35kg','40kg','45kg','50kg'],
        slug: "juguete-perro",
        type: 'juguete',
        tags: ['juguete'],
        title: "Pack 2 Juguetes para perro con sonido diseños de huesos",
        mascot: 'dog'
    },
    {
        description: "Alimento completo superpremium sin cereales para hurones. 70% de pollo, huevos y salmón, alto contenido de yuca y taurina + hexametafosfato de sodio. Ingredientes: harina de carne de pollo 26 %, guisantes deshidratados, pollo deshuesado 15 %, patatas deshidratadas, grasa de pollo (conservada con tocoferoles mezclados, 10 %), huevo deshidratado 8 %, salmón sin espinas 6 %, hígado de pollo 3 %, aceite de salmón 2 %, manzanas deshidratadas, zanahorias, levadura de cerveza, extracto de Yucca schidigera (150 mg/kg), manano-oligosacáridos (120 mg/kg), fructo-oligosacáridos (80 mg/kg).",
        brand: "Brit Animals",
        images: [
            'ferret.jpeg',
            'zoomed-6.png',
        ],
        inStock: 3,
        price: 11000,
        sizes: ['5kg','10kg','15kg','20kg','25kg','30kg','35kg','40kg','45kg','50kg'],
        slug: "ferret666",
        type: 'alimento',
        tags: ['alimento'],
        title: "Brit Animals Ferret 700 gr",
        mascot: 'exotics'
    },

]    

}