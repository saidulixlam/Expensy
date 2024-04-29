import React, { useState, useEffect } from 'react';

const LeaderBoard = (onExpenseChange) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchUserData();
    }, [onExpenseChange]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/user/expenses', {
                headers: {
                    'Authorization': token
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();

            const usersWithTotalExpenses = userData.map(user => {
                const totalExpenses = user.expenses.reduce((total, expense) => total + expense.amount, 0);
                return {
                    ...user,
                    totalExpenses
                };
            });

            usersWithTotalExpenses.sort((a, b) => b.totalExpenses - a.totalExpenses);
            setUsers(usersWithTotalExpenses);
            setError('');
        } catch (error) {
            setError('Failed to fetch user data. Please try again later.');
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-purple-300 px-5 py-3 rounded-md shadow-lg my-4'>
            <h2>Leaderboard</h2>
            {loading && <p>Loading...</p>}
            {error && (
                <p className="text-red-600 animate-shake">
                    {error}
                </p>
            )}
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Total Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.totalExpenses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <style jsx>{`
                @keyframes shake {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                    100% { transform: translateX(0); }
                }
                .animate-shake {
                    animation: shake 0.8s;
                }
            `}</style> */}
        </div>
    );
};

export default LeaderBoard;
