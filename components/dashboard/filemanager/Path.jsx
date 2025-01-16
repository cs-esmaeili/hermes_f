import CustomInput from '@/components/dashboard/CustomInput';
import Icon from '@/components/general/Icon';
import DivButton from '@/components/dashboard/DivButton';

const Path = ({ path, setPath }) => {

    return (
        <div className="flex flex-row bg-secondary p-2 justify-center items-center gap-1 " >
            <DivButton className={`bg-primary !w-fit hover:text-accent border-2 border-transparent ${path[0] == "" && "!border-accent"}`} onClick={() => {
                setPath([""]);
            }}>
                <Icon name="dashboard" className='w-8 h-8' />
                <span>خانه</span>
            </DivButton>

            <CustomInput
                value={path.join('/')}
                onChange={(e) => setPath((e.target.value).trim().split('/'))}
                inputClassName={"ltr w-full h-full"}
                containerClassName={"w-full h-full"}
            />
        </div>
    );
};

export default Path;