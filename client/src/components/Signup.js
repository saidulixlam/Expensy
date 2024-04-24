import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-14 left-0 w-full flex justify-center z-10 p-1">
            <div className="text-center absolute lg:w-1/3 sm:w-full md:w-1/3 mt-8 
            bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-xs">
                <strong className="font-bold">Request Successfull !</strong>
                <span className="block">{message}</span>
            </div>
        </div>
    );
};


const Signup = () => {

    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let formData;
        if (!isLogin) {
            formData = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            };
        } else {
            formData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            };
        }

        try {
            const response = await fetch(`http://localhost:5000/user/${isLogin ? 'login' : 'signup'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const premium = data.premium;
                console.log(premium);
                localStorage.setItem('token', token);
                localStorage.setItem('premium',premium);
                setShowSuccessModal(true);
                setTimeout(() => {
                    navigate('/expense');
                    setShowSuccessModal(false);
                }, 2000);
            } else {
                const responseData = await response.json();
                console.log(responseData);
                setError(responseData.message);

            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
            setError('Error submitting form');
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="lg:w-1/3 sm:w-3/4 md:w-1/3 bg-gray-100 shadow-md p-5 rounded-md relative">
                {showSuccessModal && <SuccessModal message={`Successfully ${isLogin ? 'Logged In' : 'Signed Up'}`} onClose={handleCloseSuccessModal} />}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-1">
                    <h2 className="text-3xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Sign up'}</h2>
                    {!isLogin && (
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                ref={nameRef}
                                placeholder="Enter your name"
                                required
                                className=" mt-1 p-1 block w-full rounded-sm"
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            placeholder="Enter your email"
                            className="form-input p-1 mt-1 block w-full rounded-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            placeholder="Enter your password"
                            className="form-input p-1 mt-1 block w-full rounded-sm"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
                    <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-green-600 w-full">{isLogin ? 'Login' : 'Signup'}</button>
                    <p className="mt-3 text-gray-400 text-center">{isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button type="button" className="text-blue-500" onClick={toggleForm}>
                            {isLogin ? 'Signup' : 'Login'}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
