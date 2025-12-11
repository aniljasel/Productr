import React, { useState } from 'react';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCard = ({ product, onDelete, onEdit, onTogglePublish }) => {
    const { name, sellingPrice, mrp, quantityStock, images, isPublished, brandName, productType, exchangeEligibility } = product;

    // State for carousel
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Fallback if no images
    const hasImages = images && images.length > 0;
    const displayImages = hasImages ? images : ['https://via.placeholder.com/300'];
    const currentImage = displayImages[currentImageIndex];
    const imageCount = images ? images.length : 0;

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                padding: '12px', // Reduced padding
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'box-shadow 0.2s',
                position: 'relative'
            }}
        >
            {/* Image Container */}
            <div className="card-image-container" style={{
                width: '100%',
                height: '160px', // Reduced height
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: '#F9FAFB',
                marginBottom: '4px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img
                    src={currentImage}
                    alt={name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'opacity 0.3s ease' }}
                />

                {/* Carousel Navigation Arrows */}
                {displayImages.length > 1 && isHovered && (
                    <>
                        <button
                            onClick={prevImage}
                            style={{
                                position: 'absolute',
                                left: '4px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '50%',
                                border: '1px solid #E5E7EB',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                                zIndex: 2
                            }}
                        >
                            <ChevronLeft size={16} color="#374151" />
                        </button>
                        <button
                            onClick={nextImage}
                            style={{
                                position: 'absolute',
                                right: '4px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '50%',
                                border: '1px solid #E5E7EB',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                                zIndex: 2
                            }}
                        >
                            <ChevronRight size={16} color="#374151" />
                        </button>
                    </>
                )}
            </div>

            {/* Carousel Indicators (Compact) */}
            {displayImages.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px', height: '4px' }}>
                    {displayImages.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                            style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: idx === currentImageIndex ? '#FF5722' : '#E5E7EB',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
            )}

            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', marginBottom: '2px', lineHeight: '1.3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {name}
            </h3>

            {/* Compact Details List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#9CA3AF' }}>Product type -</span>
                    <span style={{ color: '#4B5563' }}>{productType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#9CA3AF' }}>Quantity Stock -</span>
                    <span style={{ color: '#4B5563' }}>{quantityStock}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#9CA3AF' }}>MRP-</span>
                    <span style={{ color: '#4B5563' }}>₹ {mrp}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#9CA3AF' }}>Selling Price -</span>
                    <span style={{ color: '#111827', fontWeight: '600' }}>₹ {sellingPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#9CA3AF' }}>Brand Name -</span>
                    <span style={{ color: '#4B5563' }}>{brandName || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#9CA3AF' }}>Total Number of images -</span>
                    <span style={{ color: '#4B5563' }}>{imageCount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#9CA3AF' }}>Exchange Eligibility -</span>
                    <span style={{ color: '#4B5563', textTransform: 'uppercase' }}>{exchangeEligibility ? 'YES' : 'NO'}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="card-actions-row" style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                    onClick={() => onTogglePublish(product)}
                    style={{
                        flex: 1,
                        backgroundColor: isPublished ? '#4ADE80' : '#1E40AF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px',
                        fontWeight: '600',
                        fontSize: '12px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {isPublished ? 'Unpublish' : 'Publish'}
                </button>

                <button
                    onClick={() => onEdit(product)}
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        color: '#374151',
                        fontWeight: '600',
                        fontSize: '12px',
                        cursor: 'pointer'
                    }}
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(product._id)}
                    style={{
                        width: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        background: 'white',
                        color: '#9CA3AF',
                        cursor: 'pointer',
                        padding: 0
                    }}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
