interface Props {
    value: string;
    onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: Props) => {
    return (
        <textarea
            onChange={(event) => onChange(event.target.value)}
            value={value}
            spellCheck={false}
            className="block appearance-none resize-none w-full flex-1 outline-none text-white bg-[#1B1B1B] p-[8px] font-mono text-[14px]"
        ></textarea>
    );
};

export { Editor };
