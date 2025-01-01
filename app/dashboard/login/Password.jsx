import useCreateOrLoginWithPassword from '@/hooks/auth/useCreateOrLoginWithPassword';
import CustomInput from '@/components/dashboard/CustomInput';
import { useState } from 'react';

const Password = ({ userName }) => {

    const [password, setPassword] = useState("admin");
    const [loading, setLoading] = useState(false);
    const { passwordLogInRequest } = useCreateOrLoginWithPassword(userName, password, setLoading);

    return (
        <>
            <CustomInput placeholder='رمز عبور را وارد کنید' inputClassName={"placeholder:text-center text-center w-full"}
                value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />

            <div className='flex grow justify-center items-center'>
                {(loading) ?
                    <div className="relative  w-10 h-10">
                        <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                        <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                    </div>
                    :
                    <>
                        <button className='bg-accent p-2 w-full rounded !text-white' onClick={(e) => {
                            passwordLogInRequest();
                        }}>ورود</button>
                    </>
                }
            </div>
        </>
    );
};

export default Password;