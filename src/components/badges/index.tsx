import React from 'react';
import CustomImage from '../image/customImage';

interface RatingBadgeProps {
    iconSrc: string;         // Icon source (URL or path)
    text: string;            // Text to display (e.g., "4.9/5")
    colorVariant?: 'dark-green' | 'slate-blue'; // Color variants
}
const colorVariants = {
    'dark-green': {
        backgroundColor: 'bg-deep-green',   // Background color for dark-green variant
        textColor: 'text-mint-green',      // Text color for dark-green variant
    },
    'slate-blue': {
        backgroundColor: 'bg-slate-blue',   // Background color for slate-blue variant
        textColor: 'text-white',      // Text color for slate-blue variant
    },
};

export const RatingBadge: React.FC<RatingBadgeProps> = ({
    iconSrc,
    text,
    colorVariant = 'dark-green',
}) => {
    const { backgroundColor, textColor } = colorVariants[colorVariant];

    return (
        <div
            className={`${backgroundColor} px-4 py-1 rounded justify-center items-center inline-flex gap-x-2`}
        >
            <CustomImage src={iconSrc} height={24} width={24} />
            <span className={`${textColor} font-semibold`}>{text}</span>
        </div>
    );
};