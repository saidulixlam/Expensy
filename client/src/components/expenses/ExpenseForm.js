import React, { useRef, useState } from 'react';

const ExpenseForm = () => {
    const amountRef = useRef(null);
    const descriptionRef = useRef(null);
    const categoryRef = useRef(null);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        };
        // Add logic to submit form data to backend
        console.log(formData);
        // Optionally, you can reset the form fields and hide the form after submission
        amountRef.current.value = '';
        descriptionRef.current.value = '';
        categoryRef.current.value = '';
        setShowForm(false);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-4">
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
    );
};

export default ExpenseForm;
