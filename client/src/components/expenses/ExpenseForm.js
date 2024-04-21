import React, { useRef, useState, useEffect } from 'react';

const ExpenseForm = () => {
    const amountRef = useRef(null);
    const descriptionRef = useRef(null);
    const categoryRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/expense');
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expenses:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        };

        try {
            const response = await fetch('http://localhost:5000/user/expense', {
                method: 'POST',
                headers: {
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

    return (
        <div className="mt-8 p-4">
            <div className='max-w-lg mx-auto'>
                <button
                    className="rounded-lg shadow-lg mb-4 w-full  hover:bg-purple-500 bg-violet-700 text-white font-bold p-3 focus:outline-none focus:shadow-outline"
                    onClick={toggleForm}
                >

                    {showForm ? 'X' : 'Add Expense'}
                </button>
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
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
                    <div key={expense.id} className="relative bg-purple-300 p-4 rounded-md shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-lg font-semibold">Amount : <span className="text-green-600">{expense.amount} Rs.</span></p>
                            <button
                                onClick={() => handleDelete(expense.id)}
                                className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded-md focus:outline-none focus:shadow-outline">
                                X
                            </button>
                        </div>
                        <div className="mb-2">
                            <p className="text-md">Description :&nbsp;
                                <span className='text-gray-500'>
                                    {expense.description}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm">Category: <span className="text-blue-600">{expense.category}</span></p>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default ExpenseForm;
