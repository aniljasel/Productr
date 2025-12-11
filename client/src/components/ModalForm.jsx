import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const ModalForm = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        brandName: '',
        mrp: '',
        sellingPrice: '',
        quantityStock: '',
        productType: '',
        images: [], // Changed to handle array of strings (base64 or urls)
        isPublished: false,
        exchangeEligibility: true
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: '',
                brandName: '',
                mrp: '',
                sellingPrice: '',
                quantityStock: '',
                productType: '',
                images: [],
                isPublished: false,
                exchangeEligibility: true
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const filePromises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });

        Promise.all(filePromises).then(newBase64Images => {
            setFormData(prev => {
                // Combine existing and new, then limit to 10
                const combinedImages = [...prev.images, ...newBase64Images];
                return {
                    ...prev,
                    images: combinedImages.slice(0, 10)
                };
            });
        });

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={e => e.stopPropagation()}
                style={{
                    padding: '0',
                    borderRadius: '16px',
                    width: '500px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '90vh'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                        {initialData ? 'Edit Product' : 'Add Product'}
                    </h3>
                    <button onClick={onClose} style={{ background: 'transparent', display: 'flex', alignItems: 'center' }}>
                        <X size={20} color="#374151" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div style={{
                    padding: '24px',
                    overflowY: 'auto',
                    flex: 1,
                    backgroundColor: 'white'
                }}>
                    <form id="product-form" onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label" style={{ marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Product Name"
                                style={{ width: '100%', borderColor: '#E5E7EB', borderRadius: '8px', padding: '10px 12px' }}
                                required
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label" style={{ marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>Product Type</label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    name="productType"
                                    className="form-input"
                                    value={formData.productType}
                                    onChange={handleChange}
                                    style={{ width: '100%', borderColor: '#E5E7EB', borderRadius: '8px', padding: '10px 12px', color: formData.productType ? '#374151' : '#9CA3AF', appearance: 'none', backgroundColor: 'white' }}
                                >
                                    <option value="" disabled>Select product type</option>
                                    <option value="Foods" style={{ color: '#374151' }}>Foods</option>
                                    <option value="Electronics" style={{ color: '#374151' }}>Electronics</option>
                                    <option value="Clothes" style={{ color: '#374151' }}>Clothes</option>
                                    <option value="Beauty Products" style={{ color: '#374151' }}>Beauty Products</option>
                                    <option value="Others" style={{ color: '#374151' }}>Others</option>
                                </select>
                                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label" style={{ marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>Quantity Stock</label>
                            <input
                                type="number"
                                name="quantityStock"
                                className="form-input"
                                value={formData.quantityStock}
                                onChange={handleChange}
                                placeholder="Total numbers of Stock available"
                                style={{ width: '100%', borderColor: '#E5E7EB', borderRadius: '8px', padding: '10px 12px' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label" style={{ marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>MRP</label>
                            <input
                                type="number"
                                name="mrp"
                                className="form-input"
                                value={formData.mrp}
                                onChange={handleChange}
                                placeholder="Total numbers of Stock available"
                                required
                                style={{ width: '100%', borderColor: '#E5E7EB', borderRadius: '8px', padding: '10px 12px' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label" style={{ marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>Selling Price</label>
                            <input
                                type="number"
                                name="sellingPrice"
                                className="form-input"
                                value={formData.sellingPrice}
                                onChange={handleChange}
                                placeholder="Total numbers of Stock available"
                                required
                                style={{ width: '100%', borderColor: '#E5E7EB', borderRadius: '8px', padding: '10px 12px' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label" style={{ marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>Brand Name</label>
                            <input
                                type="text"
                                name="brandName"
                                className="form-input"
                                value={formData.brandName}
                                onChange={handleChange}
                                placeholder="Total numbers of Stock available"
                                style={{ width: '100%', borderColor: '#E5E7EB', borderRadius: '8px', padding: '10px 12px' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label className="form-label" style={{ color: '#374151', fontSize: '14px', fontWeight: '500', marginBottom: 0 }}>Upload Product Images</label>
                                {formData.images.length > 0 && (
                                    <span
                                        onClick={handleBrowseClick}
                                        style={{ fontSize: '12px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}
                                    >
                                        Add More Photos
                                    </span>
                                )}
                            </div>

                            <div
                                style={{
                                    border: '1px dashed #D1D5DB',
                                    borderRadius: '8px',
                                    padding: formData.images.length > 0 ? '16px' : '24px',
                                    textAlign: 'center',
                                    cursor: formData.images.length === 0 ? 'pointer' : 'default',
                                    backgroundColor: '#FFFFFF',
                                    minHeight: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: formData.images.length > 0 ? 'flex-start' : 'center',
                                    flexWrap: 'wrap',
                                    gap: '10px'
                                }}
                                onClick={formData.images.length === 0 ? handleBrowseClick : undefined}
                            >
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />

                                {formData.images.length === 0 ? (
                                    <div>
                                        <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>Enter Description</div>
                                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>Browse</div>
                                    </div>
                                ) : (
                                    formData.images.map((img, idx) => (
                                        <div key={idx} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                                            <img src={img} alt={`Product ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '2px',
                                                    right: '2px',
                                                    background: 'white',
                                                    borderRadius: '50%',
                                                    width: '16px',
                                                    height: '16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                }}
                                            >
                                                <X size={10} color="#374151" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '10px' }}>
                            <label className="form-label" style={{ marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>Exchange or return eligibility</label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    name="exchangeEligibility"
                                    className="form-input"
                                    value={formData.exchangeEligibility ? 'Yes' : 'No'}
                                    onChange={(e) => setFormData({ ...formData, exchangeEligibility: e.target.value === 'Yes' })}
                                    style={{ width: '100%', borderColor: '#E5E7EB', borderRadius: '8px', padding: '10px 12px', appearance: 'none', backgroundColor: 'white' }}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '20px 24px',
                    borderTop: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backgroundColor: 'white'
                }}>
                    <button
                        type="submit"
                        form="product-form"
                        className="btn btn-primary"
                        style={{
                            backgroundColor: '#1E40AF',
                            padding: '10px 32px',
                            borderRadius: '8px',
                            fontWeight: '500',
                            fontSize: '14px'
                        }}
                    >
                        {initialData ? 'Update' : 'Create'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ModalForm;
