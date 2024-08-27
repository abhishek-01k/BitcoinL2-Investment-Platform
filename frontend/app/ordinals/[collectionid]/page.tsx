import { ORDINALS_BASE_URL } from '@/constants/api';
import React from 'react';

const OrdinalPage = ({ params }: { params: any }) => {

    console.log("Params >>>", params);

    const { collectionid } = params;

    const getOrdinalInfo = async (collectionid:string) => {
        const url = `${ORDINALS_BASE_URL}/v3/market/collection/auction/collection_statistic`

        const res = await fetch(url, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ORDINAL_API}`,
            },
            body: JSON.stringify({
                collectionId: {collectionid}
            })
        })

        const response = await res.json();
        console.log("Response >>", response);

    }

    return (
        <div>
            hello world {collectionid}
        </div>
    );
};

export default OrdinalPage;