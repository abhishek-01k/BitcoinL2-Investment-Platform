import React from 'react';
import { Card } from './ui/card';
import PortfolioChart from './PortfolioChart';
import UserTransactions from './UserTransactions';

const PortfolioBody = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <PortfolioChart />
            <UserTransactions />
        </div>
    );
};

export default PortfolioBody;