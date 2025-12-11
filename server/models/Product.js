const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    productType: { type: String, default: 'Food' },
    quantityStock: { type: Number, default: 0 },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    brandName: { type: String },
    images: [{ type: String }], // store URLs
    isPublished: { type: Boolean, default: false },
    exchangeEligibility: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
