import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import runnerImage from '../assets/image.png';
const AuthLayout = ({ title, children, footerText, footerLinkText, footerLink }) => {
    return (
        <div className="auth-layout-container">
            {/* Left Side - Artistic Image */}
            <div className="auth-image-side">
                <img src={runnerImage} alt="Runner" className="auth-image" />
            </div>
            {/* Right Side - Form */}
            <div className="auth-form-side">
                <div style={{ width: '100%', maxWidth: '430px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1E1B4B', marginBottom: '40px' }}>
                        {title}
                    </h2>

                    {children}

                    {(footerText || footerLinkText) && (
                        <div className="auth-footer">
                            {footerText} <Link to={footerLink} style={{ color: '#1E1B4B', fontWeight: '600', textDecoration: 'none' }}>{footerLinkText}</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
