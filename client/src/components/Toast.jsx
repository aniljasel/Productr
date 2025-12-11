import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-container" style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3000,
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '50px',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: '300px',
            border: '1px solid #E5E7EB'
        }}>
            {type === 'success' ? (
                <CheckCircle size={20} color="#10B981" fill="#D1FAE5" />
            ) : (
                <XCircle size={20} color="#EF4444" fill="#FEE2E2" />
            )}

            <span style={{ flex: 1, color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                {message}
            </span>

            <button onClick={onClose} style={{ background: 'transparent', display: 'flex', alignItems: 'center' }}>
                <X size={16} color="#9CA3AF" />
            </button>
        </div>
    );
};

export default Toast;
