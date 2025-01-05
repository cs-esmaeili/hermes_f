import { useState } from 'react';
import Input from '@/components/dashboard/Input';
import translation from "@/translation/translation";
import useCreateRole from "@/hooks/role/useCreateRole";

export default function Add({ resetAllData, roleList }) {

    const [tempMode, setTempMode] = useState(false);
    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);
    const { createRoleRequest } = useCreateRole(roleList);



    return (
        <div className='flex items-center  justify-center cursor-pointer  rounded-md bg-transparent border-2 border-accent text-accent hover:bg-opacity-50'
            onClick={() => {
                setTempMode(true);
            }}
        >
            {tempMode ?
                <div className='text-text grow w-full'>
                    <Input
                        autoFocus
                        cssClass={'!p-0 text-center'}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                resetAllData(false);
                                createRoleRequest(e.target.value);
                                setTempMode(false);
                            }
                        }}
                        onBlur={() => {
                            setTempMode(false);
                        }} />
                </div>
                :
                <div className='p-2'>
                    +
                </div>
            }
        </div>
    )
}
