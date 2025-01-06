const DivButton = ({ onClick, children, ariaLabel, role = 'button', tabIndex = 0, className = '' }) => {

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick && onClick(event);
        }
    };

    return (
        <div
            onClick={onClick}
            onKeyDown={handleKeyPress}
            role={role}
            tabIndex={tabIndex}
            aria-label={ariaLabel}
            className={`flex ${process.env.NEXT_PUBLIC_DIRECTION} items-center rounded-lg p-3 ${className}`}
        >
            {children}
        </div>
    );
};

export default DivButton;
