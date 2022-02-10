interface Props {
    onSubmit: (value: string) => void;
}

const CommandLine = ({ onSubmit }: Props) => {
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            onSubmit(event.currentTarget.value);
        }
    };

    return (
        <div className="border-t-2 h-[36px] border-[#242424] bg-[#1b1b1b] px-[12px]">
            <input
                type="text"
                className="h-full w-full appearance-none outline-none font-mono text-xs text-white bg-transparent"
                spellCheck={false}
                placeholder="enter file name here"
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export { CommandLine };
