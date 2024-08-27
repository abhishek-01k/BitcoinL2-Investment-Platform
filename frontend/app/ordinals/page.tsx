"use client"
import OrdinalLists from '@/components/ordinalsList/ordinalLists';
import { Button } from '@/components/ui/button';
import { ORDINALS_BASE_URL } from '@/constants/api';
import React from 'react';

const OrdinalsPage = () => {

    const getOrdinalsList = async () => {
        const url = `${ORDINALS_BASE_URL}/v3/market/collection/auction/collection_statistic_list`

        const res = await fetch(url, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ORDINAL_API}`,
            },
            body: JSON.stringify({
                filter: {
                    timeType: "24h"
                },
                start: 0,
                limit: 10
            })
        })

        const response = await res.json();
        console.log("Response >>", response);

    }

    return (
        <div>
            <Button onClick={getOrdinalsList}>Get ordinals</Button>

            <OrdinalLists />
        </div>
    );
};

export default OrdinalsPage;