import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const UserTransactions = () => {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                    You made 265 sales this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* <RecentSales /> */}
            </CardContent>
        </Card>
    );
};

export default UserTransactions;