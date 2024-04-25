import React, { useRef, useState, useEffect } from 'react';
import LeaderBoard from '../premium/LeaderBord';

const ExpenseForm = () => {
    const amountRef = useRef(null);
    const descriptionRef = useRef(null);
    const categoryRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [userPremium, setUserPremium] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedPremium = localStorage.getItem('premium');

        setUserPremium(storedPremium === 'true');
        
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {

        try {
            const response = await fetch('http://localhost:5000/user/expense', {
                headers: {
                    'Authorization': token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
            const data = await response.json();
            setExpenses(data);
            
        } catch (error) {
            console.error('Error fetching expenses:', error.message);
        }
    };

    const handleExpenseChange = () => {
        
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        };

        try {
            const response = await fetch('http://localhost:5000/user/expense', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add expense');
            }


            amountRef.current.value = '';
            descriptionRef.current.value = '';
            categoryRef.current.value = '';
            setShowForm(false);
            fetchExpenses();

        } catch (error) {
            console.error('Error adding expense:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/user/expense/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete expense');
            }
            fetchExpenses();
            console.log('Expense deleted successfully');
        } catch (error) {
            console.error('Error deleting expense:', error.message);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handlePremiumClick = async (e) => {
        try {
            const response = await fetch('http://localhost:5000/purchase/premium', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to upgrade to premium');
            }

            const order = await response.json();

            var options = {
                "key": order.key_id,
                "amount": "100",
                "currency": "INR",
                "name": "Expenses premium",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": order.order.id,
                "handler": async function (response) {
                    const res = await fetch('http://localhost:5000/purchase/status', {

                        method: 'POST',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            order_id: options.order_id,
                            payment_id: response.razorpay_payment_id
                        })
                    });
                    alert("YOU ARE A PREMIUMUM MEMBER NOW");
                    const data = await res.json();
                    const premium=data.user.premium;
                    localStorage.setItem('premium',premium);
                    setUserPremium(true);
                },
                "prefill": {
                    "name": "SAIDUL ISLAM",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            // document.getElementById('rzp-button1').onclick = function(e){
            rzp1.open();
            e.preventDefault();
            // }

        } catch (error) {
            console.error('Error handling premium click:', error.message);
            // Handle error
        }
    };

    return (
        <div className="mt-8 p-4">
            {!userPremium && <button
                id='rzp-button1'
                className="fixed bottom-2 right-4 bg-yellow-500 text-black text-sm px-4 py-2 rounded-md"
                onClick={handlePremiumClick}
            >
                Premium
            </button>}
            {userPremium && <button
                id='rzp-button1'
                className="fixed bottom-2 right-4 bg-yellow-500 text-black text-sm px-4 py-2 rounded-md"
                
            >
                You are a premium user
            </button>}
            <div className='max-w-lg mx-auto'>
                <button
                    className="rounded-lg shadow-lg mb-4 w-full  hover:bg-purple-500 bg-violet-700 text-white font-bold p-3 focus:outline-none focus:shadow-outline"
                    onClick={toggleForm}
                >

                    {showForm ? 'X' : 'Add Expense'}
                </button>
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-5  mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                                Amount Spent
                            </label>
                            <input
                                ref={amountRef}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="amount"
                                type="number"
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                ref={descriptionRef}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                placeholder="Enter description"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                Category
                            </label>
                            <select
                                ref={categoryRef}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="category"
                                required
                            >
                                <option value="">Select category</option>
                                <option value="Food">Food</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Salary">Salary</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="w-full mt-2 bg-purple-600 hover:bg-violet-700 text-white font-bold p-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Add expense
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                <div className="col-span-full mt-6 mb-4">
                    <h1 className='text-center font-bold text-3xl'>Expenses are here!</h1>
                </div>
                {expenses.map((expense) => (
                    <div key={expense.id} className="relative bg-purple-300 px-5 py-3 rounded-md shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-lg font-semibold">Amount : <span className="text-green-600">{expense.amount} Rs.</span></p>
                            <button
                                onClick={() => handleDelete(expense.id)}
                                className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded-md focus:outline-none focus:shadow-outline">
                                X
                            </button>
                        </div>
                        <div>
                            <p className="text-md">Category: <span className="text-blue-600">{expense.category}</span></p>
                        </div>
                        <div className="my-2">
                            <p className="text-md">Description :&nbsp;
                                <span className='text-gray-500'>
                                    {expense.description}
                                </span>
                            </p>
                        </div>

                    </div>

                ))}
            </div>
            <div>
            <LeaderBoard onExpenseChange={handleExpenseChange} />
            </div>
        </div>
    );
};

export default ExpenseForm;
