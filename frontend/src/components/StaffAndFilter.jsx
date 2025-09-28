import React from 'react';
import {Badge} from "@/components/ui/badge.jsx";
import {FilterType} from "@/lib/data.js";
import {Button} from "@/components/ui/button.jsx";
import {Filter} from "lucide-react";

function StaffAndFilter({completeTaskCount = 0, activeTaskCount = 0, filter = "all", setFilter}) {
    return (
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            {/* Phần thống kê */}
            <div className="flex gap-3">
                <Badge variant="secondary" className='bg-white/50 text-accent-foreground border-info/20'>
                    {activeTaskCount} {FilterType.all}
                </Badge>
                <Badge variant="secondary" className='bg-white/50 text-success border-success/20'>
                    {completeTaskCount} {FilterType.completed}
                </Badge>
            </div>
            {/* Phần filter */}
            <div className='flex flex-col gap-2 sm:flex-row'>
                {Object.keys(FilterType).map((type) => (
                    <Button
                        key={type}
                        variant={filter === type ? 'gradient' : 'ghost'}
                        size='sm'
                        className='capitalize'
                        onClick={() => setFilter(type)}
                    >
                        <Filter className='size-4'/>
                        {FilterType[type]}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default StaffAndFilter;