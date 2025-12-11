import React, { useState, useEffect } from 'react';
import { ChevronDown, Home, ShoppingBag, Grid, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';

const Topbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const { user } = useAuth(); // Get user
    const { toggleSidebar } = useSidebar();

    const getPageDetails = () => {
        switch (location.pathname) {
            case '/products':
                return { title: 'Products', icon: <ShoppingBag size={18} /> };
            case '/':
            case '/dashboard':
                return { title: 'Home', icon: <Home size={18} /> };
            default:
                return { title: 'Productr', icon: <Grid size={18} /> };
        }
    };

    const { title, icon } = getPageDetails();

    return (
        <div
            className="topbar"
            style={{
                justifyContent: 'space-between',
                position: 'relative',
                background: 'linear-gradient(90deg, #FFF0F0 0%, #FFFCF2 50%, #F0F4FF 100%)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                    className="mobile-menu-btn"
                    onClick={toggleSidebar}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'none', marginRight: '5px' }}
                >
                    <Menu size={24} color="#374151" />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#374151', paddingLeft: '0px', fontWeight: '500' }}>
                    {icon}
                    <span>{title}</span>
                </div>
            </div>

            <div
                className="user-profile"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{ cursor: 'pointer' }}
            >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                    <img src={user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <ChevronDown size={16} color="#6B7280" />
            </div>

            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </div>
    );
};

export default Topbar;
