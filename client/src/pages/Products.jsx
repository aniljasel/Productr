import React, { useState, useEffect } from 'react';
import API from '../api/api';
import ProductCard from '../components/ProductCard';
import ModalForm from '../components/ModalForm';
import DeleteModal from '../components/DeleteModal';
import { Plus, Grid } from 'lucide-react';
import Toast from '../components/Toast';
import { useSearch } from '../context/SearchContext';

const Products = () => {
    const { searchTerm } = useSearch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [toast, setToast] = useState(null);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const fetchProducts = () => {
        setLoading(true);
        API.get('/products')
            .then(res => setProducts(res.data))
            .catch(err => showToast('Failed to fetch', 'error'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter Logic
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const requestDelete = (id) => {
        const product = products.find(p => p._id === id);
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;

        try {
            await API.delete(`/products/${productToDelete._id}`);
            setProducts(prev => prev.filter(p => p._id !== productToDelete._id));
            showToast("Product deleted successfully", "success");
        } catch (error) {
            showToast("Failed to delete", "error");
        } finally {
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    const handleTogglePublish = async (product) => {
        try {
            const updated = { ...product, isPublished: !product.isPublished };
            await API.put(`/products/${product._id}`, updated);
            setProducts(prev => prev.map(p => p._id === product._id ? updated : p));
            showToast(`Product ${updated.isPublished ? 'Published' : 'Unpublished'}`, "success");
        } catch (error) {
            showToast("Status update failed", "error");
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingProduct) {
                const res = await API.put(`/products/${editingProduct._id}`, formData);
                setProducts(prev => prev.map(p => p._id === editingProduct._id ? res.data : p));
                showToast("Product updated", "success");
            } else {
                const res = await API.post('/products', formData);
                setProducts(prev => [res.data, ...prev]);
                showToast("Product added successfully", "success");
            }
            setIsModalOpen(false);
        } catch (error) {
            showToast("Operation failed", "error");
        }
    };

    // Calculate if we should show the top header content
    const showHeader = products.length > 0;

    return (
        <div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {showHeader && (
                <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: '20px' }}>
                    <div
                        onClick={handleAddClick}
                        style={{
                            cursor: 'pointer',
                            color: '#6B7280',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        <Plus size={16} /> Add Products
                    </div>
                </div>
            )}

            {loading ? (
                <div>Loading...</div>
            ) : products.length === 0 ? (
                <div className="empty-state">
                    <div style={{ marginBottom: '20px' }}>
                        {/* Exact Icon match: 4 squares + Plus */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '22px 22px',
                            gap: '4px',
                            margin: '0 auto',
                            width: '48px'
                        }}>
                            <div style={{ height: '22px', border: '4px solid #1E1B4B', borderRadius: '4px' }}></div>
                            <div style={{ height: '22px', border: '4px solid #1E1B4B', borderRadius: '4px' }}></div>
                            <div style={{ height: '22px', border: '4px solid #1E1B4B', borderRadius: '4px' }}></div>
                            <div style={{ height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '4px', height: '16px', background: '#1E1B4B', borderRadius: '2px' }}></div>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '4px', background: '#1E1B4B', borderRadius: '2px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className="empty-title" style={{ fontSize: '20px' }}>Feels a little empty over here...</h3>
                    <p className="empty-desc">You can create products without connecting store you can add products to store anytime</p>
                    <button className="btn btn-primary" onClick={handleAddClick} style={{ backgroundColor: '#1E40AF', padding: '12px 40px' }}>
                        Add your Products
                    </button>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map(p => (
                        <ProductCard
                            key={p._id}
                            product={p}
                            onDelete={requestDelete}
                            onEdit={handleEditClick}
                            onTogglePublish={handleTogglePublish}
                        />
                    ))}
                </div>
            )}

            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={editingProduct}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                productName={productToDelete?.name}
            />
        </div>
    );
};

export default Products;
