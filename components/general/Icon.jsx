
const Icon = ({ name, className = 'w-12 h-12', ...props }) => {
    try {
        const IconComponent = require(`@/icons/${name}.svg`).default;

        return <IconComponent className={className} {...props} />;
    } catch (error) {
        console.error(`Icon "${name}" not found in the icons folder.`);
        return null;
    }
};

export default Icon;
