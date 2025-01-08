import { useEffect } from 'react';
import CustomInput from '../CustomInput';
import { BsImage } from "react-icons/bs";
import InputDatePicker from '../InputDatePicker';
import { BsCake2 } from "react-icons/bs";
import Lottie from "lottie-react";
import Teacher from '@/animations/teacher.json';


const CreateUser2 = ({ setParentLoading }) => {


    useEffect(() => {

        setParentLoading(false);
    }, []);

    return (
        <div className='flex flex-col grow max-h-full overflow-x-auto gap-3 bg-primary rounded-xl p-5'>

            <div className='flex flex-row grow gap-5'>
                <div className='flex flex-col w-4/6 gap-3'>
                    <CustomInput rightLabel={"ایمیل"} inputClassName={"bg-secondary w-full"} />
                    <CustomInput rightLabel={"رمز عبور"} inputClassName={"bg-secondary"} />
                    <CustomInput rightLabel={"نام و نام خانوادگی (فارسی)"} inputClassName={"bg-secondary"} />
                    <CustomInput rightLabel={"کد ملی"} inputClassName={"bg-secondary"} />
                </div>
                <div className='flex items-center justify-center bg-secondary w-2/6 p-20 rounded-md'>
                    <BsImage className='text-5xl rounded' />
                </div>
            </div>
            <Lottie animationData={Teacher} />;
            <div className={`bg  ${process.env.NEXT_PUBLIC_DIRECTION}`}>
            </div>
            <div className='flex grow gap-5 justify-center items-end'>
                <InputDatePicker icon={<BsCake2 />} />
                <CustomInput rightLabel={"شماره شبا"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
            </div>
            <div className='flex grow gap-5'>

                <CustomInput rightLabel={"شماره کارت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                <CustomInput rightLabel={"نام پدر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
            </div>
            <div className='flex grow gap-5'>

                <CustomInput rightLabel={"نام شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                <CustomInput rightLabel={"کد  ثبت شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
            </div>
            <div className='flex grow gap-5'>

                <CustomInput rightLabel={"کد اختصاصی شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                <CustomInput rightLabel={"کد پستی"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
            </div>
            <div className='flex grow gap-5'>
                <CustomInput rightLabel={"استان"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
                <CustomInput rightLabel={"شهر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} />
            </div>
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
        </div>
    );
};

export default CreateUser2;