import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Reset = () => {
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { token } = useParams();

    const handleUpdate = () => {
        setError(null);
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        // Perform validation
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Send request to update password with token
        fetch(`http://localhost:5000/user/reset-password/${token}`, {
            method: 'POST',
            body: JSON.stringify({ password, token }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                const responseData = await response.json();
                if (response.ok) {
                    alert("Password updated successfully");
                    setSuccess(true);
                    setTimeout(() => {
                        navigate('/'); 
                    }, 2000);
                    
                } else {
                    setError(responseData.message);
                }
            })
            .catch(error => {
                console.error("Error updating password:", error);
                setError(error.message);
                
            });
            setTimeout(() => {
                setError(null); 
            }, 2000);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            
            {!success && (
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>
                    {error && (
                        <p className="mx-2 p-2 rounded-md bg-red-400 text-dark text-center">{error}</p>
                    )}
                    <div className="p-2">
                        <input
                            type="password"
                            placeholder="New Password"
                            ref={passwordRef}
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            ref={confirmPasswordRef}
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={handleUpdate}
                            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none"
                        >
                            Update
                        </button>
                    </div>
                    
                </div>
            )}
            {success && (
                <div className="flex justify-center items-center h-screen">
                    <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
                        <h1 className="text-center text-3xl mb-4">Request Successful</h1>
                        <p className="text-center text-xl mb-4">Redirecting you to login</p>
                        <p className="text-center">Kindly login again.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reset;
