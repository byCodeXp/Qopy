import React from 'react';

const IconClose = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#818181"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

const Tab = ({ label }: { label: string }) => (
    <div className="bg-[#333333] w-[200px] h-[34px] px-[12px] flex flex-row justify-between items-center">
        <span className="leading-[34px] text-white">{label}</span>
        <IconClose />
    </div>
);

export { Tab };
