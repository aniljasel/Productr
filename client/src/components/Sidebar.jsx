import { NavLink, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, LogOut, Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useSidebar } from '../context/SidebarContext';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const { searchTerm, setSearchTerm } = useSearch();
    const { isSidebarOpen, closeSidebar } = useSidebar();

    return (
        <>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 99
                    }}
                />
            )}

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="logo">
                    <img src={logo} alt="Productr" style={{ height: '40px', objectFit: 'contain' }} />
                </div>

                {/* Search Bar in Sidebar */}
                <div className="search-bar" style={{ marginBottom: '20px', position: 'relative' }}>
                    <Search size={16} color="#6B7280" style={{ position: 'absolute', left: '25px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            backgroundColor: '#2D303E',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            padding: '10px 10px 10px 36px',
                            color: 'white',
                            outline: 'none',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div className="nav-links">
                    <NavLink
                        to="/"
                        onClick={closeSidebar} // Close on click (mobile)
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Home size={20} />
                        <span>Home</span>
                    </NavLink>

                    <NavLink
                        to="/products"
                        onClick={closeSidebar} // Close on click (mobile)
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <ShoppingBag size={20} />
                        <span>Products</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
