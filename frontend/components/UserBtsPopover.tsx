import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';


const UserBtsPopover = ({
    userDetails,
    selectedBTS,
    setSelectedBTS
}: {
    userDetails: any
    selectedBTS: any
    setSelectedBTS: any
}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <div className='flex items-center justify-start'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[400px] justify-between"
                    >
                        {selectedBTS
                            ? selectedBTS.btsDetails.name
                            : "Select BTS..."}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {userDetails.map((userDetail : any) => (
                                    <CommandItem
                                        key={userDetail._id}
                                        value={userDetail.btsDetails.name}
                                        onSelect={(currentValue) => {
                                            if (currentValue !== selectedBTS?.btsDetails?.name) {
                                                setSelectedBTS(userDetail)
                                            }
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 size-4",
                                                selectedBTS?.btsDetails?.name === userDetail.btsDetails.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {userDetail.btsDetails.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>

            </Popover>




        </div>
    );
};

export default UserBtsPopover;