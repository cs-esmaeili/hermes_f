import useLoginWithPassword from '@/hooks/auth/useLoginWithPassword';
import CustomInput from '@/components/dashboard/CustomInput';
import { useState } from 'react';

const Password = ({ userName, setError, SetPage }) => {

    const [password, setPassword] = useState("admin");
    const [loading, setLoading] = useState(false);
    const { passwordLogInRequest } = useLoginWithPassword(userName, password, setLoading, setError, setLoading);

    return (
        <>

            <CustomInput rightLabel='رمز عبور را وارد کنید' leftLabel={"فراموشی رمز عبور"} inputClassName={"placeholder:text-center text-center w-full"}
                value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }}
                onLeftLabelClick={() => {
                    SetPage("resetPassword");
                }}
            />

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