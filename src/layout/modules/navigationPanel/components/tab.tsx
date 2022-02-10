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
                    ? 'bg-[#1b1b1b] border-[#1b1b1b]'
                    : 'bg-[#333333] border-[#222222]'
            } border-b-2 px-[12px] w-[192px] flex justify-between`}
        >
            <span className="text-white font-mono text-xs my-auto">
                {label}
            </span>
            <div onClick={onClose} className="my-auto">
                <IconClose ref={ref} />
            </div>
        </div>
    );
};

export { Tab };
