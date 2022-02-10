interface Props {
    className?: string;
}

const IconPlus = ({ className }: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className ?? 'w-[16px] h-[16px]'}
        fill="none"
        viewBox="0 0 24 24"
        stroke="#818181"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M12 4v16m8-8H4"
        />
    </svg>
);

export { IconPlus };
