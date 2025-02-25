import { useState, useEffect, useRef } from "react";
import CustomInput from '@/components/dashboard/CustomInput';
import { BsImage, BsCake2 } from "react-icons/bs";
import InputDatePicker from '@/components/dashboard/InputDatePicker';
import PickFile from "@/components/dashboard/PickFile";
import CustomImage from "@/components/dashboard/CustomImage";
import useCreateCertificate from "@/hooks/certificate/useCreateCertificate";
import { ImCross } from "react-icons/im";
import DivButton from "@/components/dashboard/DivButton";
import CustomSelect from "../CustomSelect";

const converSelectedUserToFormData = (selectedCert) => {
    return {
        name: selectedCert?.name || "ICDL",
        score: selectedCert?.score || "32432423",
        fullName: selectedCert?.fullName || "32432423",
        nationalCode: selectedCert?.nationalCode || "32432423",
        birthday: selectedCert?.birthday || "32432423",
        fatherName: selectedCert?.fatherName || "32432423",
        companyName: selectedCert?.companyName || "32432423",
        economicCode: selectedCert?.economicCode || "32432423",
        registrationNumber: selectedCert?.registrationNumber || "32432423",
        postalCode: selectedCert?.postalCode || "32432423",
        ostan: selectedCert?.ostan || "32432423",
        shahr: selectedCert?.shahr || "32432423",
        address: selectedCert?.address || "32432423",
        address: selectedCert?.address || "32432423",
        file: selectedCert?.user?.image?.url || null,
    }
}
const VUserProfile = ({ setSelectedCert, selectedCert, setParentLoading }) => {

    const pickFileRef = useRef(null);
    const scrollbarRef = useRef();

    const [formData, setFormData] = useState(converSelectedUserToFormData(selectedCert));
    console.log(converSelectedUserToFormData(selectedCert));

    const { createCertificateRequest } = useCreateCertificate(() => { setFormData(converSelectedUserToFormData(null)) }, (persent) => {

    });

    useEffect(() => {
        if (setParentLoading) setParentLoading(false);

        return () => {
            setSelectedCert(null);
            setFormData(converSelectedUserToFormData(null));
        };
    }, []);

    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleFileChange = (file) => {
        setFormData({ ...formData, file });
    };


    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <div className='flex flex-col grow h-full gap-3 bg-primary rounded-xl p-5 overflow-auto' ref={scrollbarRef}>
            {selectedCert  && (
                <div className="flex justify-between bg-orange-400 p-3 rounded-md">
                    <div className="flex grow items-center">{`User : ${selectedCert._id}`}</div>
                    <DivButton className="flex items-center !w-fit" onClick={() => setSelectedCert(null)}>
                        <ImCross className="text-textcolor" />
                    </DivButton>
                </div>
            )}
            <div className='flex flex-col-reverse md:flex-row grow gap-5'>
                <div className='flex flex-col w-full md:w-4/6 gap-3'>
                    <CustomSelect
                        rightLabel="مدرک آزمون"
                        containerClassName="w-full"
                        selectClassName="bg-secondary"
                        value={formData.certificate}
                        onChange={handleInputChange('certificate')}
                        placeholder="انتخاب کنید"
                        options={[
                            { value: 'ICDL', label: 'ICDL' },
                        ]}
                    />
                    <CustomInput rightLabel={"نام و نام خانوادگی (فارسی)"} inputClassName={"bg-secondary"} value={formData.fullName} onChange={handleInputChange('fullName')} />
                    <CustomInput rightLabel={"کد ملی"} inputClassName={"bg-secondary"} value={formData.nationalCode} onChange={handleInputChange('nationalCode')} />
                    <CustomInput rightLabel={"نام پدر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.fatherName} onChange={handleInputChange('fatherName')} />
                    <CustomInput rightLabel={"نمره"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.score} onChange={handleInputChange('score')} />

                    <InputDatePicker icon={<BsCake2 />} value={formData.birthday} onChange={(time) => setFormData({ ...formData, birthday: time })} />
                </div>
                <div className={`flex items-center justify-center bg-secondary w-full md:w-2/6 py-10 md:p-5 xl:p-10 rounded-md`}>
                    <PickFile ref={pickFileRef} fileSelectListener={handleFileChange} />
                    {formData.file ? (
                        <div className="relative">
                            <CustomImage src={isValidUrl(formData.file) ? formData.file : URL.createObjectURL(formData.file)} width={200} height={200} onClick={() => pickFileRef.current.openFilePicker()} />
                        </div>
                    ) : (
                        <BsImage className='text-5xl rounded' onClick={() => pickFileRef.current.openFilePicker()} />
                    )}
                </div>
            </div>
            <div className='flex flex-col md:flex-row grow gap-5'>
                <CustomInput rightLabel={"استان"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.ostan} onChange={handleInputChange('ostan')} />
                <CustomInput rightLabel={"شهر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.shahr} onChange={handleInputChange('shahr')} />
            </div>
            <div className='flex flex-col md:flex-row grow gap-5'>
                <CustomInput rightLabel={"آدرس"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.address} onChange={handleInputChange('address')} />
            </div>
            <div className='flex flex-col md:flex-row grow gap-5'>
                <CustomInput rightLabel={"کد پستی"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.postalCode} onChange={handleInputChange('postalCode')} />
            </div>
            <div className='flex flex-col md:flex-row grow gap-5'>
                <CustomInput rightLabel={"نام شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.companyName} onChange={handleInputChange('companyName')} />
                <CustomInput rightLabel={"کد  ثبت شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.registrationNumber} onChange={handleInputChange('registrationNumber')} />
            </div>
            <div className='flex flex-col md:flex-row grow gap-5'>
                <CustomInput rightLabel={"کد اختصاصی شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.economicCode} onChange={handleInputChange('economicCode')} />
            </div>
            <DivButton className={`bg-orange-500 text-textcolor w-full flex justify-center items-center`} onClick={() => {
                createCertificateRequest(formData);
            }}>
                ساخت کاربر
            </DivButton>
        </div >
    );
};

export default VUserProfile;