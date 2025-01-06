import DivButton from '@/components/dashboard/DivButton';
import Icon from "@/components/general/Icon";

const NavigationMenu = ({ items, page, setPage }) => {
    if (!items) {
        return null;
    }
    return (
        <div className={`flex h-fit w-fit self-center p-5 gap-10 justify-end bg-primary rounded-xl ${process.env.NEXT_PUBLIC_DIRECTION}`}>
            {items.map((item, index) => (
                <DivButton
                    key={index}
                    className={`gap-1 ${page === item.page && 'text-white bg-accent dark:bg-secondary'}`}
                    onClick={() => setPage(item.page)}
                >
                    <Icon name={item.icon} className="w-8 h-8" />
                    <span>{item.label}</span>
                </DivButton>
            ))}
        </div>
    );
};

export default NavigationMenu;