import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import OtpInput from '../components/OtpInput';
import Toast from '../components/Toast';

const Login = () => {
    const navigate = useNavigate();
    const { loginInit, loginVerify } = useAuth();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [error, setError] = useState('');
    const [toast, setToast] = useState(null);

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (step === 1) {
                if (!email) {
                    setError('Please enter your email');
                    return;
                }
                console.log('Attempting Login Init for:', email);
                await loginInit(email);
                console.log('Login Init success');
                showToast("OTP sent successfully", "success");
                setStep(2);
            } else {
                if (!otp) {
                    setError('Please enter OTP');
                    return;
                }
                await loginVerify(email, otp);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <AuthLayout
            title={step === 1 ? "Login to your Productr Account" : "Verify OTP"}
            footerText={step === 1 ? "Don't have a Productr Account" : ""}
            footerLinkText={step === 1 ? "SignUp Here" : ""}
            footerLink="/signup"
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}

                {step === 1 ? (
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                            Email or Phone number
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Acme@gmail.com"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid #C0C0C0',
                                fontSize: '16px',
                                color: '#333',
                                outline: 'none',
                                background: 'white'
                            }}
                        />
                    </div>
                ) : (
                    <div>
                        <div className="form-group" style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                                Enter OTP
                            </label>
                            <OtpInput length={6} onComplete={(val) => setOtp(val)} />
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: '25px', fontSize: '14px', color: '#666' }}>
                            Didn't receive OTP? <span style={{ color: '#1E1B4B', cursor: 'pointer', fontWeight: '600' }}>Resend</span>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className='btn-primary'
                    style={{
                        width: '100%',
                        padding: '14px',
                        background: '#1E1B4B', /* Dark blue from design */
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    {step === 1 ? 'Login' : 'Verify OTP'}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;
