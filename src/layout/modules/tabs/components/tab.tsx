import { IconClose } from './iconClose';

interface TabProps {
    label: string;
    active: boolean;
    onClickClose: () => void;
    onClick: () => void;
}

export const Tab = ({ label, active, onClickClose, onClick }: TabProps) => {
    const idleTabStyle = 'bg-accent-color border-common-color';
    const activeTabStyle = 'bg-primary-color border-primary-color';

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClick();
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`${
                active ? activeTabStyle : idleTabStyle
            } border-b-2 px-[12px] w-[192px] flex justify-between cursor-pointer transition-colors`}
        >
            <span onClick={handleClick} className="text-white font-mono text-xs my-auto">
                {label}
            </span>
            <div
                onClick={onClickClose}
                className="my-auto transition-colors text-[#818181] hover:text-[#636363] rounded cursor-pointer"
            >
                <IconClose />
            </div>
        </div>
    );
};
