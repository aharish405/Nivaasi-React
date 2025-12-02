import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Filter } from 'lucide-react';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTransactions();
        fetchSummary();
    }, [filter]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const url = filter === 'all' ? '/api/transactions' : `/api/transactions?type=${filter}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            }
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSummary = async () => {
        try {
            const response = await fetch('/api/transactions/summary/all');
            if (response.ok) {
                const data = await response.json();
                setSummary(data);
            }
        } catch (error) {
            console.error('Failed to fetch summary:', error);
        }
    };

    const getTypeIcon = (type) => {
        return type === 'Expense' ? TrendingDown : TrendingUp;
    };

    const getTypeColor = (type) => {
        const colors = {
            'Rent': 'text-green-600 bg-green-50',
            'Deposit': 'text-blue-600 bg-blue-50',
            'Expense': 'text-red-600 bg-red-50'
        };
        return colors[type] || 'text-gray-600 bg-gray-50';
    };

    const getStatusBadge = (status) => {
        return status === 'Collected' ? 'badge-success' : 'badge-warning';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {summary.map((item) => (
                    <div key={item._id} className="card bg-gradient-to-br from-primary to-primary-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-90">{item._id}</p>
                                <p className="text-2xl font-bold mt-1">₹{item.total?.toLocaleString() || 0}</p>
                                <div className="mt-2 text-xs space-y-1">
                                    <p>Collected: ₹{item.collected?.toLocaleString() || 0}</p>
                                    <p>Pending: ₹{item.pending?.toLocaleString() || 0}</p>
                                </div>
                            </div>
                            <DollarSign className="w-12 h-12 opacity-80" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="card">
                <div className="flex items-center gap-2 overflow-x-auto">
                    <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    {['all', 'Rent', 'Deposit', 'Expense'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${filter === type
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {type === 'all' ? 'All' : type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transaction List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : transactions.length === 0 ? (
                <div className="card text-center py-12">
                    <p className="text-gray-500">No transactions found</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {transactions.map((transaction) => {
                        const Icon = getTypeIcon(transaction.type);
                        return (
                            <div key={transaction._id} className="card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${getTypeColor(transaction.type)}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {transaction.type}
                                                </h3>
                                                {transaction.description && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {transaction.description}
                                                    </p>
                                                )}
                                                {transaction.tenantId?.personalDetails?.name && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Tenant: {transaction.tenantId.personalDetails.name}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-xl font-bold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'
                                                    }`}>
                                                    {transaction.type === 'Expense' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-sm text-gray-600">
                                                {formatDate(transaction.date)}
                                            </span>
                                            <span className={`badge ${getStatusBadge(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </div>

                                        {transaction.mode && transaction.mode !== 'N/A' && (
                                            <div className="mt-2 text-xs text-gray-500">
                                                Payment Mode: {transaction.mode}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Transactions;
