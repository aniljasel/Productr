import React, { useState, useEffect } from 'react';
import { Home, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api';
import ProductCard from '../components/ProductCard';
import { useSearch } from '../context/SearchContext';
import ModalForm from '../components/ModalForm';
import DeleteModal from '../components/DeleteModal';
import Toast from '../components/Toast';

const Dashboard = () => {
    const navigate = useNavigate();
    const { searchTerm } = useSearch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('published');
    const [toast, setToast] = useState(null);

    // Modal States (Reusing logic for full functionality)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        API.get('/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const showToast = (message, type) => setToast({ message, type });

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesTab = activeTab === 'published' ? product.isPublished : !product.isPublished;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Handlers (Reused from Products.jsx to ensure consistent behavior)
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


    return (
        <div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="tabs" style={{ marginTop: '0px', borderBottom: '1px solid #E5E7EB' }}>
                <div className={`tab ${activeTab === 'published' ? 'active' : ''}`} onClick={() => setActiveTab('published')} style={{ paddingBottom: '15px' }}>
                    Published
                </div>
                <div className={`tab ${activeTab === 'unpublished' ? 'active' : ''}`} onClick={() => setActiveTab('unpublished')} style={{ paddingBottom: '15px' }}>
                    Unpublished
                </div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : filteredProducts.length === 0 ? (
                <div className="empty-state" style={{ marginTop: '50px' }}>
                    <div style={{ color: '#1E1B4B', marginBottom: '20px' }}>
                        {/* Icon */}
                        <div style={{ display: 'grid', gridTemplateColumns: '22px 22px', gap: '4px', margin: '0 auto', width: '48px' }}>
                            <div style={{ height: '22px', border: '4px solid #1E1B4B', borderRadius: '4px' }}></div>
                            <div style={{ height: '22px', border: '4px solid #1E1B4B', borderRadius: '4px' }}></div>
                            <div style={{ height: '22px', border: '4px solid #1E1B4B', borderRadius: '4px' }}></div>
                            <div style={{ height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '4px', height: '16px', background: '#1E1B4B', borderRadius: '2px' }}></div>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '4px', background: '#1E1B4B', borderRadius: '2px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className="empty-title" style={{ color: '#1F2937', fontSize: '20px', fontWeight: '700' }}>
                        {searchTerm ? `No results for "${searchTerm}"` : `No ${activeTab === 'published' ? 'Published' : 'Unpublished'} Products`}
                    </h3>
                    <p className="empty-desc" style={{ maxWidth: '400px', lineHeight: '1.5' }}>
                        {searchTerm ? "Try checking your spelling or use different keywords." : "Your products will appear here once you create them."}
                    </p>
                    {!searchTerm && (
                        <button className="btn btn-primary" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} style={{ backgroundColor: '#1E40AF', padding: '10px 30px' }}>
                            Create Product
                        </button>
                    )}
                </div>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map(p => (
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

            {/* Modals */}
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

export default Dashboard;
