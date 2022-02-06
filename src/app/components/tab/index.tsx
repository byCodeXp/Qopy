import React, { LegacyRef, useRef } from 'react';

const IconClose = React.forwardRef<any, any>((props, ref) => (
    <svg
        ref={ref}
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
));

interface Props {
    label: string;
    active: boolean;
    onClick: () => void;
    onClose: (index: number) => void;
    index: number;
}

const Tab = ({ label, active, onClick, onClose, index }: Props) => {
    const ref = useRef(null);

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (event.target !== ref.current) {
            onClick();
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`${
                active
                    ? 'bg-[#1b1b1b] h-[36px]'
                    : 'bg-[#333333] mb-[2px] h-[34px]'
            } w-[200px] px-[12px] flex flex-row justify-between items-center`}
        >
            <span className="leading-[34px] text-white">{label}</span>
            <div onClick={() => onClose(index)}>
                <IconClose ref={ref} />
            </div>
        </div>
    );
};

export { Tab };
