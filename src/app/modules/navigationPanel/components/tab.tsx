import { useRef, forwardRef } from 'react';

const IconClose = forwardRef<SVGSVGElement, {}>((_props, ref) => (
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
    onClose: () => void;
}

const Tab = ({ label, active, onClick, onClose }: Props) => {
    const ref = useRef<SVGSVGElement>(null);

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (ref.current?.contains(event.target as Node)) {
            return;
        }

        onClick();
    };

    return (
        <div
            onClick={handleClick}
            className={`${
                active
                    ? 'bg-[#1b1b1b] pb-[2px]'
                    : 'bg-[#333333] mb-[2px]'
            } box-content w-[192px] h-[34px] px-[12px] flex flex-row justify-between items-center`}
        >
            <span className="leading-[34px] text-white font-mono text-xs">{label}</span>
            <div onClick={onClose}>
                <IconClose ref={ref} />
            </div>
        </div>
    );
};

export { Tab };
