import { useState, useEffect } from "react";
import CustomInput from '../CustomInput';
import { BsImage } from "react-icons/bs";
import InputDatePicker from '../InputDatePicker';
import { BsCake2 } from "react-icons/bs";
import Lottie from "lottie-react";
import Teacher from '@/public/assets/animations/teacher.json';
import Company from '@/public/assets/animations/company.json';


const CreateUser2 = ({ setParentLoading }) => {

    const [userType, setUserType] = useState('normal');

    useEffect(() => {

        setParentLoading(false);
    }, []);

    return (
        <div className='flex flex-col grow max-h-full overflow-x-auto gap-3 bg-primary rounded-xl p-5'>

            <div className='flex flex-row grow gap-5'>
                <div className='flex flex-col w-4/6 gap-3'>
                    <CustomInput rightLabel={"نام و نام خانوادگی (فارسی)"} inputClassName={"bg-secondary"} />
                    <CustomInput rightLabel={"کد ملی"} inputClassName={"bg-secondary"} />
                    <CustomInput rightLabel={"نام پدر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                    <InputDatePicker icon={<BsCake2 />} />

                </div>
                <div className='flex items-center justify-center bg-secondary w-2/6 p-20 rounded-md'>
                    <BsImage className='text-5xl rounded' />
                </div>
            </div>
            <div className='flex grow gap-5 justify-center items-end'>
                <CustomInput rightLabel={"شماره شبا"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                <CustomInput rightLabel={"شماره کارت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
            </div>
            <div className='flex grow gap-5'>
                <CustomInput rightLabel={"استان"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                <CustomInput rightLabel={"شهر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
            </div>
            <div className='flex grow gap-5'>
                <CustomInput rightLabel={"آدرس"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
            </div>
            <div className='flex grow gap-5'>
                <CustomInput rightLabel={"کد پستی"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
            </div>

            <div className='flex grow gap-3'>
                <div className={`w-1/2 flex flex-col bg-secondary rounded-lg p-3 justify-center items-center border-2 border-transparent hover:border-accent
                 ${userType == "company" && "!border-accent"}`}
                    onClick={() => setUserType("company")}>
                    <Lottie animationData={Company} className='w-1/2 h-60' />
                    <span>شرکت / حقوقی هستم</span>
                </div>
                <div className={`w-1/2 flex flex-col bg-secondary rounded-lg p-3 justify-center items-center border-2 border-transparent hover:border-accent
                ${userType == "teacher" && "!border-accent"}`}
                    onClick={() => setUserType("teacher")}>
                    <Lottie animationData={Teacher} className='w-1/2 h-60' />
                    <span>مدرس هستم</span>
                </div>
            </div>

            {(userType == "teacher") &&
                <>
                    <div className='flex grow gap-5'>
                        <CustomInput rightLabel={"نام شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                        <CustomInput rightLabel={"کد  ثبت شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                    </div>
                    <div className='flex grow gap-5'>
                        <CustomInput rightLabel={"کد اختصاصی شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                    </div>
                </>
            }
            {(userType == "company") &&
                <>
                    <div className='flex grow gap-5'>
                        <CustomInput rightLabel={"درباره من"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                        <CustomInput rightLabel={"گیت هاب"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                    </div>
                    <div className='flex grow gap-5'>
                        <CustomInput rightLabel={"لینکدین"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                        <CustomInput rightLabel={"تلگرام"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                    </div>
                    <div className='flex grow gap-5'>
                        <CustomInput rightLabel={"اینستا"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                        <CustomInput rightLabel={"توییتر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                    </div>
                </>
            }
        </div>
    );
};

export default CreateUser2;