import { ordinalList } from '@/constants/ordinalsLists';
import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const OrdinalLists = () => {

    console.log("ordinalList", ordinalList);

    const router = useRouter();

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">#</TableHead>
                        <TableHead className="">Collection</TableHead>
                        <TableHead className="">Collection Name</TableHead>
                        <TableHead className="">Floor Price</TableHead>
                        <TableHead className="">Volume</TableHead>
                        <TableHead className="">Last 24h Change</TableHead>
                        <TableHead className="">Listed/Items</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ordinalList.map((ordinal, index) => {
                        const iconUrl = ordinal.icon.startsWith('http') ?
                            ordinal.icon :
                            `https://static.unisat.io/content/${ordinal.icon}`;
                        const volumeChange = (ordinal.btcValuePercent) * 100
                        return (
                            <TableRow className='cursor-pointer' key={index} onClick={() => {
                                router.push(`/ordinals/${ordinal.collectionId}`)
                            }}>
                                <TableCell className="font-medium capitalize">{index + 1}</TableCell>
                                <TableCell className="font-medium">
                                    <Image className='rounded-xl' src={iconUrl} alt={ordinal.name} height={40} width={40} />
                                </TableCell>
                                <TableCell className="font-medium capitalize">
                                    {ordinal.name}
                                </TableCell>
                                <TableCell className="font-medium capitalize">
                                    <div className='flex flex-row gap-1'>
                                        <Image src='https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400' alt='Bitcoin' width={18} height={18} />
                                        {(ordinal.floorPrice / 100000000).toFixed(5)}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium capitalize">
                                    <div className='flex flex-row gap-1'>
                                        <Image src='https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400' alt='Bitcoin' width={18} height={18} />
                                        {(ordinal.btcValue / 100000000).toFixed(5)}
                                    </div>
                                </TableCell>

                                <TableCell className={`${ordinal.btcValuePercent >= 0 ? 'text-green-700' : 'text-red-700'}`}
                                >
                                    {volumeChange.toFixed(2)}%
                                </TableCell>

                                <TableCell className="">{ordinal.listed}/{ordinal.total}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrdinalLists;