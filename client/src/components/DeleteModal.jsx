import React from 'react';
import { X } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{
                width: '450px',
                textAlign: 'left',
                padding: '30px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>Delete Product</h3>
                    <button onClick={onClose} style={{ background: 'transparent' }}><X size={24} color="#374151" /></button>
                </div>

                <p style={{ color: '#4B5563', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
                    Are you sure you really want to delete this Product<br />
                    <span style={{ fontWeight: '700', color: '#111827' }}>“ {productName}”</span> ?
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onConfirm}
                        className="btn"
                        style={{
                            backgroundColor: '#1E40AF',
                            color: 'white',
                            padding: '12px 30px',
                            fontSize: '16px',
                            borderRadius: '8px'
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
