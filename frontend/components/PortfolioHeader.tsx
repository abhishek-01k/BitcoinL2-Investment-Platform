import React from 'react';
import { Button } from './ui/button';

const PortfolioHeader = ({
    btsDetails
}: {
    btsDetails: any
}) => {
    return (
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{btsDetails.name}</h2>
            <div className="flex items-center space-x-2">
                <Button>Download</Button>
            </div>
        </div>
    );
};

export default PortfolioHeader;