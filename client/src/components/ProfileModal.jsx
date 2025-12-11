import React, { useState, useEffect } from 'react';
import { User, LogOut, Settings, X, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, logout, updateUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPreviewUrl(user.profileImage);
        }
    }, [user]);

    if (!isOpen) return null;

    const handleLogout = () => {
        logout();
        onClose();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (imageFile) {
            formData.append('profileImage', imageFile);
        }

        try {
            await updateUser(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
            // Optionally add toast error here
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: '60px',
            right: '20px',
            width: '320px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            border: '1px solid #E5E7EB',
            zIndex: 2000,
            overflow: 'hidden'
        }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>My Profile</h3>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={18} color="#9CA3AF" /></button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #F3F4F6', position: 'relative' }}>
                            <img src={previewUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=random`} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        {isEditing && (
                            <label htmlFor="profile-upload" style={{
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                background: '#1E40AF',
                                padding: '6px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white',
                                cursor: 'pointer'
                            }}>
                                <Camera size={12} color='white' />
                                <input type="file" id="profile-upload" style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
                            </label>
                        )}
                    </div>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        {isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                                />
                            </div>
                        ) : (
                            <>
                                <div style={{ fontWeight: '700', fontSize: '16px', color: '#111827' }}>{user?.name || 'User'}</div>
                                <div style={{ fontSize: '13px', color: '#6B7280' }}>{user?.email || 'email@example.com'}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px 0' }}>
                {isEditing ? (
                    <div style={{ display: 'flex', gap: '10px', padding: '0 20px 10px 20px' }}>
                        <button onClick={() => setIsEditing(false)} className="btn-secondary" style={{ flex: 1 }}>
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="btn-primary"
                            style={{ flex: 1, padding: '8px' }}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => setIsEditing(true)}
                        style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: '0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <User size={18} color="#6B7280" />
                        <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                            Edit Profile
                        </span>
                    </div>
                )}
            </div>

            <div style={{ padding: '15px 20px', borderTop: '1px solid #F3F4F6' }}>
                <button
                    onClick={handleLogout}
                    className="btn-danger-soft"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileModal;
