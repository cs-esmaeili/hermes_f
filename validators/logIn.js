import * as yup from 'yup';

export const fourDigitCodeSchema = yup.object().shape({
  code: yup
    .string()
    .length(4, 'کد باید دقیقا 4 رقم باشد')
    .matches(/^\d{4}$/, 'کد باید فقط شامل اعداد باشد')
    .required('کد الزامی است'),
});
