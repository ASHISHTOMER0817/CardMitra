"use client";
import Popup from '@/app/components/Popup';
import axios from 'axios';
import React, { FormEvent, useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    async function sendOtp ()  {
        // e.preventDefault()
           try{
            const response = await axios.post('/api/users/forgotPassword', {email})
            const success = response.data.success;
            console.log(success)
            success && setOtpSent(true);
           }catch{
            Popup('error', 'Something went wrong')
           }
        // } else {
        //     setError('Please enter a valid email address.');
        // }
    };

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
        } else {
            // Call the backend to reset the password
            console.log('Email:', email);
            console.log('Password:', password);
            // Reset the form or redirect to another page
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-300">
                <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
                <p className="text-gray-600 mb-6 text-center">
                    This action is irreversible. Don&apos;t share OTP with others.
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        otpSent ? handleSubmit() : sendOtp();
                    }}
                >
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={otpSent}
                            className={`py-4 px-3 outline-none border border-gray-400 rounded-full sm:py-2 sm:pl-6 w-full ${otpSent ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                        />
                    </div>
                    {otpSent && (
                        <>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="New password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="py-4 px-3 outline-none border border-gray-400 rounded-full sm:py-2 sm:pl-6 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="py-4 px-3 outline-none border border-gray-400 rounded-full sm:py-2 sm:pl-6 w-full"
                                />
                            </div>
                        </>
                    )}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="py-3 px-6 bg-[#39AC73] text-white rounded-full sm:py-2 transition-colors duration-200 hover:bg-[#2e895b]"
                        >
                            {otpSent ? 'Submit' : 'Get OTP'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
