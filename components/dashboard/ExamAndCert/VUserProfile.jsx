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
import useGetCertificateTemplates from '@/hooks/CertificateTemplate/useGetCertificateTemplates';
import CertificateList from "./CertificateList";

const converSelectedUserToFormData = (selectedCert) => {
    return {
        name: selectedCert?.name || "",
        score: selectedCert?.score || "",
        fullName: selectedCert?.fullName || "",
        nationalCode: selectedCert?.nationalCode || "",
        fatherName: selectedCert?.fatherName || "",
        file: selectedCert?.user?.image?.url || null,


        cert_template_id: selectedCert?.cert_template_id || "",
        startDate: selectedCert?.startDate || "32432423",
        endDate: selectedCert?.endDate || "32432423",
        title: selectedCert?.title || "32432423",
    }
}
const VUserProfile = ({ setParentLoading }) => {

    const pickFileRef = useRef(null);
    const scrollbarRef = useRef();
    const [certTemplates, setCertTemplates] = useState(null);
    const [selectedCert, setSelectedCert] = useState(null);
    const [formData, setFormData] = useState(converSelectedUserToFormData(null));


    const { getCertificateTemplatesRequest } = useGetCertificateTemplates((templates) => {
        setCertTemplates(templates);
        setFormData({ ...formData, cert_template_id: templates[0]._id })
    });

    const { createCertificateRequest } = useCreateCertificate(
        () => {
            setFormData(prevData => ({
                startDate: prevData.startDate,
                endDate: prevData.endDate,
                title: prevData.title,
                cert_template_id: prevData.cert_template_id, // جلوگیری از حذف مقدار cert_template_id
                name: "",
                score: "",
                fullName: "",
                nationalCode: "",
                fatherName: "",
                file: null,
            }));
        },
        (persent) => {
            // مدیریت مقدار پیشرفت در صورت نیاز
        }
    );

    useEffect(() => {
        if (setParentLoading) setParentLoading(false);

        return () => {
            setSelectedCert(null);
            setFormData(converSelectedUserToFormData(null));
        };
    }, []);

    useEffect(() => {
        getCertificateTemplatesRequest();
    }, []);

    useEffect(() => {
        if (selectedCert)
            setFormData(converSelectedUserToFormData(selectedCert));
    }, [selectedCert]);

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
        <div className='flex flex-col grow h-fit gap-3  p-5 overflow-auto'>
            {selectedCert && (
                <div className="flex justify-between bg-orange-400 p-3 rounded-md">
                    <div className="flex grow items-center">{`User : ${selectedCert._id}`}</div>
                    <DivButton className="flex items-center !w-fit" onClick={() => setSelectedCert(null)}>
                        <ImCross className="text-textcolor" />
                    </DivButton>
                </div>
            )}
            <div className='flex flex-col-reverse md:flex-row grow gap-5  bg-primary p-3 rounded-xl rtl'>
                <CustomInput rightLabel={"عنوان دوره"} containerClassName="w-full" inputClassName={"bg-secondary"} value={formData.title} onChange={handleInputChange('title')} />
                <CustomInput rightLabel={"تاریخ شروع"} containerClassName="w-full" inputClassName={"bg-secondary"} value={formData.startDate} onChange={handleInputChange('startDate')} />
                <CustomInput rightLabel={"تاریخ پایان"} containerClassName="w-full" inputClassName={"bg-secondary"} value={formData.endDate} onChange={handleInputChange('endDate')} />
            </div>
            <div className='flex flex-col-reverse md:flex-row grow gap-5  bg-primary p-3 rounded-xl'>
                <div className='flex flex-col w-full md:w-4/6 gap-3'>
                    <CustomSelect
                        rightLabel="مدرک آزمون"
                        containerClassName="w-full"
                        selectClassName="bg-secondary"
                        value={formData.cert_template_id}
                        onChange={handleInputChange('cert_template_id')}
                        placeholder="انتخاب کنید"
                        options={Array.isArray(certTemplates)
                            ? certTemplates.map(template => ({
                                value: template._id,
                                label: template.name,
                            }))
                            : []}
                    />
                    <CustomInput rightLabel={"نام و نام خانوادگی (فارسی)"} inputClassName={"bg-secondary"} value={formData.fullName} onChange={handleInputChange('fullName')} />
                    <CustomInput rightLabel={"کد ملی"} inputClassName={"bg-secondary"} value={formData.nationalCode} onChange={handleInputChange('nationalCode')} />
                    <CustomInput rightLabel={"نام پدر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.fatherName} onChange={handleInputChange('fatherName')} />
                    <CustomInput rightLabel={"نمره"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.score} onChange={handleInputChange('score')} />

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
            <DivButton className={`bg-orange-500 text-textcolor w-full flex justify-center items-center`} onClick={() => {
                console.log(formData);

                createCertificateRequest(formData);
            }}>
                ساخت کاربر
            </DivButton>
            <CertificateList selectMode setSelectedCert={setSelectedCert} />
        </div >
    );
};

export default VUserProfile;