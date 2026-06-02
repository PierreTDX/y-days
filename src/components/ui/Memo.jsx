import React from "react";
import { Card } from "@/components/ui/card";

const bookmar = '/y-days/icons/Bookmarkicon.svg';
const bulb = '/y-days/icons/Bulbicon.svg';
const search = '/y-days/icons/Searchicon.svg';


const variants = {
    bookmark: {
        bg: "bg-[#A076E420]",
        Icon: bookmar,
    },
    bulb: {
        bg: "bg-[#FFC83A20]",
        Icon: bulb,
    },
    search: {
        bg: "bg-[#E75A3D10]",
        Icon: search,
    },
};

export function Memo({ variant = "bookmark", className = "", children }) {
    const { bg, Icon } = variants[variant] || variants.bookmark;
    return (
        <div className={`relative inline-flex ${className}`}>
            <div className="absolute -top-6 -left-6 z-10 flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center">
                <img src={Icon} alt={`${variant} icon`} className="" />
            </div>
            <Card className={`flex items-start gap-1 p-4 pl-9 rounded-[10px] text-muted-foreground ${bg}`}>{children}</Card>
        </div>
    );
}

export default Memo;