import React, { useState, useEffect } from 'react';

const LeaderBoard = (onExpenseChange) => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        
        fetchUserData();
    }, [onExpenseChange]);

    const fetchUserData = async () => {
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

            // Calculate total expenses for each user
            const usersWithTotalExpenses = userData.map(user => {
                // Calculate total expenses for the current user
                const totalExpenses = user.expenses.reduce((total, expense) => total + expense.amount, 0);
                return {
                    ...user,
                    totalExpenses
                };
            });

            usersWithTotalExpenses.sort((a, b) => b.totalExpenses - a.totalExpenses);

            // Set the state with sorted user data
            setUsers(usersWithTotalExpenses);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className='bg-purple-300 px-5 py-3 rounded-md shadow-lg my-4'>
            <h2>Leaderboard</h2>
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
        </div>
    );
};

export default LeaderBoard;
