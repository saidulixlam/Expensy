import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Forget = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // New state for loading indicator
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true); // Set loading state to true when request starts
        console.log(email);
        try {
            const response = await fetch('http://localhost:5000/user/forget-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('User not found');
            }

            setSuccess(true);
            setEmail('');
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false); // Set loading state to false when request completes
        }
    };

    const resetForm = () => {
        setEmail('');
        setError('');
        setSuccess(false);
        navigate('/');
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-6">Reset your password</h2>
            <div className="p-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full px-4 py-2 bg-blue-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:bg-blue-600"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Loading...' : 'Reset'}
                </button>
                {error && (
                    <div className="text-black mt-2">
                        {error}
                        <button
                            onClick={() => setError('')}
                            className="mx-4 text-red-600 underline focus:outline-none bg-white p-1 px-3 rounded-md"
                        >
                            X
                        </button>
                    </div>
                )}
                {success && (
                    <div className="text-green-600 bg-white mt-3 w-full px-4 py-1 rounded-md">
                        Request sent successfully!
                        <button
                            onClick={resetForm}
                            className="mx-4 text-green-600 underline focus:outline-none bg-white p-1 px-3 rounded-md"
                        >
                            OK
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Forget;
