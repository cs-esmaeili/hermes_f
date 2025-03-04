import * as yup from 'yup';

export const ProfileSchema = yup.object().shape({
    userName: yup
        .string()
        .min(11, 'شماره تلفن باید 11 رقم باشد')
        .required('وارد کردن شماره تلفن یا ایمیل الزامی است'),

    email: yup
        .string()
        .email('ایمیل معتبر نیست')
        .required('وارد کردن ایمیل الزامی است'),

    password: yup
        .string()
        .min(4, 'رمز عبور باید حداقل 4 کاراکتر باشد')
        .required('رمز عبور الزامی است'),

    fullName: yup
        .string()
        .min(2, 'نام خانوادگی معتبر نیست')
        .required('وارد کردن نام و نام خانوادگی الزامی است'),

    nationalCode: yup
        .string()
        .min(10, 'کد ملی 10 رقم می باشد')
        .required('وارد کردن کد ملی الزامی است'),

    birthday: yup
        .date()
        .typeError('تاریخ تولد نامعتبر است')
        .required('وارد کردن تاریخ تولد الزامی است'),

    shebaNumber: yup
        .string()
        .notRequired()
        .matches(/^$|^\d{24}$/, 'شماره شبا باید 24 رقم باشد'),

    cardNumber: yup
        .string()
        .notRequired()
        .matches(/^$|^\d{16}$/, 'شماره کارت باید 16 رقم باشد'),

    fatherName: yup.string(),
    companyName: yup.string(),
    economicCode: yup.string(),
    registrationNumber: yup.string(),
    postalCode: yup
        .string()
        .notRequired()
        .matches(/^$|^\d{10}$/, 'شماره شبا باید 10 رقم باشد'),
    ostan: yup.string(),
    shahr: yup.string(),
    github: yup.string(),
    linkedin: yup.string(),
    telegram: yup.string(),
    instagram: yup.string(),
    twitter: yup.string(),
    address: yup.string(),
    biography: yup.string(),
    iWant: yup.string(),
}).required();
