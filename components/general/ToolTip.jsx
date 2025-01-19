const Tooltip = ({ content, children }) => {
    return (
        <div className="relative group">
            <div className="cursor-pointer">{children}</div>
            <div
                className="absolute z-20 top-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg"
            >
                {content}
            </div>
        </div>
    );
};

export default Tooltip;
