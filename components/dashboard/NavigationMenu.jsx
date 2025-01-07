import DivButton from '@/components/dashboard/DivButton';
import Icon from "@/components/general/Icon";

const NavigationMenu = ({ items, page, setPage, containerClass = "" }) => {
    if (!items) {
        return null;
    }
    return (
        <div className={`flex h-fit w-full self-center gap-3 justify-end rounded-xl
         ${process.env.NEXT_PUBLIC_DIRECTION}
         ${containerClass}
         `}>

            {items.map((item, index) => (
                <DivButton
                    key={index}
                    className={`transition duration-200 border-2 border-transparent hover:border-accent hover:border-opacity-75 hover:text-accent bg-primary rounded-lg 
                        ${page === item.page && "text-accent border-2 !border-accent"}`}
                    onClick={() => setPage(item.page)}>
                    <Icon name={item.icon} className="w-8 h-8" />
                    <span>{item.label}</span>
                </DivButton>
            ))}
        </div>
    );
};

export default NavigationMenu;