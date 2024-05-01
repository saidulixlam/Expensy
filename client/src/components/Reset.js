import React, { useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

const Reset = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const navigate=useNavigate();
    // const location = useLocation();
    const { token } = useParams();
    console.log(token);

    const handleUpdate = () => {
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const email = emailRef.current.value;

        // Perform validation
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Send request to update password with token
        fetch(`http://localhost:5000/user/reset-password/${token}`, {
            method: 'POST',
            body: JSON.stringify({ password,email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                alert("Password updated successfully");
                navigate('/');
            }
        })
        .catch(error => {
            console.error("Error updating password:", error);
            alert("Failed to update password");
        });
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
            <div className="p-2">
            <input
                    type="email"
                    placeholder="Enter email"
                    ref={emailRef}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
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
    );
};

export default Reset;
