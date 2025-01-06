import { useState, useEffect } from 'react';
import CustomInput from '../CustomInput';

const CreateUser2 = ({ setParentLoading }) => {


    useEffect(() => {

        setParentLoading(false);
    }, []);

    return (
        <div className='flex flex-col grow max-h-full overflow-x-auto p-3 bg-primary rounded-xl'>

            <CustomInput rightLabel={"ایمیل"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"رمز عبور"} inputClassName={"bg-secondary"} />

            <CustomInput rightLabel={"نام و نام خانوادگی (فارسی)"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"کد ملی"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"تاریخ تولد"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"شماره شبا"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"شماره کارت"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"نام پدر"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"نام شرکت"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"کد  ثبت شرکت"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"کد اختصاصی شرکت"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"کد پستی"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"استان"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"شهر"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"درباره من"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"گیت هاب"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"لینکدین"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"تلگرام"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"اینستا"} inputClassName={"bg-secondary"} />
            <CustomInput rightLabel={"توییتر"} inputClassName={"bg-secondary"} />
        </div>
    );
};

export default CreateUser2;