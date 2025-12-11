const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const connectDB = require('../config/db');

dotenv.config(); // Loads .env from current directory (server/)

const products = [
    {
        name: 'CakeZone Walnut Brownie',
        productType: 'Food',
        quantityStock: 200,
        mrp: 2000,
        sellingPrice: 1500,
        brandName: 'CakeZone',
        images: [
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=2076&auto=format&fit=crop'
        ],
        isPublished: true,
        exchangeEligibility: true
    },
    {
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        productType: 'Electronics',
        quantityStock: 50,
        mrp: 29900,
        sellingPrice: 24900,
        brandName: 'Sony',
        images: [
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1976&auto=format&fit=crop',
        ],
        isPublished: true,
        exchangeEligibility: false
    },
    {
        name: 'Nike Air Force 1 \'07',
        productType: 'Fashion',
        quantityStock: 120,
        mrp: 9695,
        sellingPrice: 9695,
        brandName: 'Nike',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
        ],
        isPublished: false,
        exchangeEligibility: true
    },
    {
        name: 'MacBook Air M2',
        productType: 'Electronics',
        quantityStock: 15,
        mrp: 119900,
        sellingPrice: 99900,
        brandName: 'Apple',
        images: [
            'https://images.unsplash.com/photo-1611186871348-b1ce695e52a9?q=80&w=2070&auto=format&fit=crop',
        ],
        isPublished: true,
        exchangeEligibility: false
    }
];

const seedData = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        console.log('Data Destroyed');
        await Product.insertMany(products);
        console.log('Data Imported');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
