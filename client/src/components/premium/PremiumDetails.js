import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
const PremiumDetails = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();

        return () => {
            // Cleanup function (if needed)
        };
    }, [token]);

    const handleDownload = () => {
        // Get the element containing the entire page content
        const element = document.getElementById('report-content');

        // Configure the PDF options
        const options = {
            margin: 0.5,
            filename: 'expense_report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate the PDF
        html2pdf().set(options).from(element).save();
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center">Error: {error}</div>;
    }

    if (expenses.length === 0) {
        return <div className="text-center">No expenses found.</div>;
    }

    // Function to calculate total expenses per year
    const calculateTotalExpensesPerYear = () => {
        const totals = {};
        expenses.forEach(expense => {
            const year = new Date(expense.createdAt).getFullYear();
            if (totals[year]) {
                totals[year] += expense.amount;
            } else {
                totals[year] = expense.amount;
            }
        });
        return totals;
    };

    // Calculate total expenses per year
    const totalExpensesPerYear = calculateTotalExpensesPerYear();
    const incomeAmount = 25000;

const currentYear = new Date().getFullYear();
const expensesForCurrentYear = totalExpensesPerYear[currentYear] || 0;

const savings = incomeAmount - expensesForCurrentYear;

    // console.log(savings,totalExpensesPerYear);
    return (
        <div className="container mx-auto">
            <div id="report-content">
            <h1 className="text-3xl font-bold mb-8 text-center mt-8">Expense Report</h1>
            <table className="w-full mb-8">
                <thead>
                <tr className="w-full">
            <th className="border px-1 py-2 w-1/4">Date</th>
            <th className="border px-2 py-2 w-1/4">Description</th>
            <th className="border px-2 py-2 w-1/4">Category</th>
            <th className="border px-2 py-2 w-1/4">Amount (Rs)</th>
        </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td className="border px-4 py-2">{new Date(expense.createdAt).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">{expense.description}</td>
                            <td className="border px-4 py-2">{expense.category}</td>
                            <td className="border px-4 py-2">{expense.amount} Rs</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="text-2xl font-bold my-6 text-center">Total Expenses per Year</h2>
            <table className="w-full">
                <thead>
                <tr className="w-full">
                        <th className="border px-1 py-2 w-1/4">Year</th>
                        <th className="border px-1 py-2 w-1/4">Total Income</th>
                        <th className="border px-2 py-2">Toal Expense</th>
                        <th className="border px-2 py-2">Savings (Rs)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(totalExpensesPerYear).map(([year, total]) => (
                        <tr key={year}>
                            <td className="border px-4 py-2">{year}</td>
                            <td className="border px-4 py-2">{incomeAmount} Rs</td>
                            <td className="border px-4 py-2">{total}</td>
                            <td className="border px-4 py-2">{savings} Rs</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-8">
                <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Download Report
                </button>
                </div>
            </div>
        </div>
    );
};

export default PremiumDetails;
