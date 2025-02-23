import { useState, useEffect, useRef } from "react";
import CustomInput from '@/components/dashboard/CustomInput';
import { BsImage, BsCake2 } from "react-icons/bs";
import InputDatePicker from '@/components/dashboard/InputDatePicker';
import Lottie from "lottie-react";
import Teacher from '@/public/assets/animations/teacher.json';
import Company from '@/public/assets/animations/company.json';
import Degree from '@/public/assets/animations/degree.json';
import PickFile from "@/components/dashboard/PickFile";
import CustomImage from "@/components/dashboard/CustomImage";
import useChangeAvatar from "@/hooks/user/useChangeAvatar";
import useUpdateUserData from "@/hooks/user/useUpdateUserData";
import useCreateUser from "@/hooks/user/useCreateUser";
import useUserInformation from "@/hooks/user/useUserInformation";
import { useModalContext } from '@/components/dashboard/Modal';
import Roles from "@/components/dashboard/role/Roles";
import { ImCross } from "react-icons/im";
import DivButton from "@/components/dashboard/DivButton";
import ApprovalStatus from "./approval/ApprovalStatus";


const converSelectedUserToFormData = (selectedUser) => {
    return {
        userName: selectedUser?.userName || "32432423",
        email: selectedUser?.email || "32432423",
        password: "",
        role: selectedUser?.role_id || "32432423",
        fullName: selectedUser?.data?.fullName || "32432423",
        nationalCode: selectedUser?.data?.nationalCode || "32432423",
        birthday: selectedUser?.data?.birthday || "32432423",
        shebaNumber: selectedUser?.data?.shebaNumber || "32432423",
        cardNumber: selectedUser?.data?.cardNumber || "32432423",
        fatherName: selectedUser?.data?.fatherName || "32432423",
        companyName: selectedUser?.data?.companyName || "32432423",
        economicCode: selectedUser?.data?.economicCode || "32432423",
        registrationNumber: selectedUser?.data?.registrationNumber || "32432423",
        postalCode: selectedUser?.data?.postalCode || "32432423",
        ostan: selectedUser?.data?.ostan || "32432423",
        shahr: selectedUser?.data?.shahr || "32432423",
        github: selectedUser?.data?.github || "32432423",
        linkedin: selectedUser?.data?.linkedin || "32432423",
        telegram: selectedUser?.data?.telegram || "32432423",
        instagram: selectedUser?.data?.instagram || "32432423",
        twitter: selectedUser?.data?.twitter || "32432423",
        address: selectedUser?.data?.address || "32432423",
        biography: selectedUser?.data?.biography || "32432423",
        file: selectedUser?.data?.image?.url || null,
        iWant: selectedUser?.data?.iWant || "",
    }
}
const Profile = ({ setSelectedUser, selectedUser, isAdmin = false, setParentLoading }) => {
    const [userType, setUserType] = useState('normal');
    const { openModal, closeModal } = useModalContext();
    const pickFileRef = useRef(null);
    const scrollbarRef = useRef();

    const [formData, setFormData] = useState(converSelectedUserToFormData(selectedUser));

    const { createUserRequest } = useCreateUser(() => { setFormData(initialFormData) });
    const { userInformationRequest } = useUserInformation(selectedUser?._id, setSelectedUser);
    const { updateUserDataRequest } = useUpdateUserData(selectedUser?._id, userInformationRequest);
    const { changeAvatarRequest } = useChangeAvatar(selectedUser?._id, () => {
        userInformationRequest();
    });




    useEffect(() => {
        if (setParentLoading) setParentLoading(false);
        userInformationRequest();

        return () => {
            setSelectedUser(null);
            setFormData(converSelectedUserToFormData(null));
        };
    }, []);



    useEffect(() => {
        if (selectedUser) {
            setFormData(converSelectedUserToFormData(selectedUser));
        }
    }, [selectedUser]);

    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleFileChange = (file) => {
        setFormData({ ...formData, file });
    };

    const handleRoleChange = (newRole) => {
        setFormData({ ...formData, role: newRole });
        closeModal();
    };

    const handleSubmit = () => {
        const userData = { ...formData, role_id: formData.role._id };
        selectedUser ? updateUserDataRequest(userData) : createUserRequest(userData);
    };

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (e) {
            return false;
        }
    }

    useEffect(() => {
        if (userType !== "normal") {
            scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
            setFormData({ ...formData, iWant: userType })
        }
    }, [userType]);

    useEffect(() => {
        console.log(formData.iWant);
    }, [formData]);

    return (
        <div className='flex flex-col grow h-full gap-3 bg-primary rounded-xl p-5 overflow-auto' ref={scrollbarRef}>
            {selectedUser && <ApprovalStatus approval={selectedUser} />}
            {selectedUser && isAdmin && (
                <div className="flex justify-between bg-orange-400 p-3 rounded-md">
                    <div className="flex grow items-center">{`User : ${selectedUser._id}`}</div>
                    <DivButton className="flex items-center !w-fit" onClick={() => setSelectedUser(null)}>
                        <ImCross className="text-textcolor" />
                    </DivButton>
                </div>
            )}
            <div className='flex flex-col-reverse md:flex-row grow gap-5'>
                <div className='flex flex-col w-full md:w-4/6 gap-3'>
                    {(isAdmin || !selectedUser) && (
                        <>
                            <CustomInput rightLabel={"شماره تلفن (نام کاربری)"} inputClassName={"bg-secondary"} value={formData.userName} onChange={handleInputChange('userName')} />
                            <CustomInput rightLabel={"ایمیل"} inputClassName={"bg-secondary"} value={formData.email} onChange={handleInputChange('email')} />
                        </>
                    )}
                    <CustomInput rightLabel={"رمز عبور"} inputClassName={"bg-secondary"} value={formData.password} onChange={handleInputChange('password')} />
                    <CustomInput rightLabel={"نام و نام خانوادگی (فارسی)"} inputClassName={"bg-secondary"} value={formData.fullName} onChange={handleInputChange('fullName')} />
                    <CustomInput rightLabel={"کد ملی"} inputClassName={"bg-secondary"} value={formData.nationalCode} onChange={handleInputChange('nationalCode')} />
                    <CustomInput rightLabel={"نام پدر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.fatherName} onChange={handleInputChange('fatherName')} />
                    <InputDatePicker icon={<BsCake2 />} value={formData.birthday} onChange={(time) => setFormData({ ...formData, birthday: time })} />
                    {(isAdmin || !selectedUser) && (
                        <DivButton className="bg-red-500 items-end justify-center" onClick={() => openModal(<Roles selectMode listener={handleRoleChange} />)}>
                            <span>{formData.role.name || "انتخاب نقش"}</span>
                        </DivButton>
                    )}
                </div>
                <div className={`flex items-center justify-center bg-secondary w-full md:w-2/6 py-10 md:p-5 xl:p-10 rounded-md ${!selectedUser && "opacity-25"}`}>
                    {selectedUser ? (
                        <>
                            <PickFile ref={pickFileRef} fileSelectListener={handleFileChange} />
                            {formData.file ? (
                                <div className="relative">
                                    <CustomImage src={isValidUrl(formData.file) ? formData.file : URL.createObjectURL(formData.file)} width={200} height={200} onClick={() => pickFileRef.current.openFilePicker()} />
                                    <DivButton className="flex w-full items-center justify-center bg-purple-500 mt-3" onClick={() => changeAvatarRequest(formData.file)}>
                                        ثبت
                                    </DivButton>
                                </div>
                            ) : (
                                <BsImage className='text-5xl rounded' onClick={() => pickFileRef.current.openFilePicker()} />
                            )}
                        </>
                    ) : (
                        <BsImage className='text-5xl rounded' />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 grow">
                {['company', 'Teacher', 'certificate'].map((type) => (
                    <div key={type} className={`flex flex-col bg-secondary rounded-lg p-3 justify-center items-center border-2 border-transparent hover:border-accent ${userType === type && "!border-accent"}`} onClick={() => setUserType(userType === type ? "normal" : type)}>
                        <Lottie animationData={{ company: Company, Teacher: Teacher, certificate: Degree }[type]} className="w-1/2 h-60" />
                        <span>{type === "company" ? "شرکت / حقوقی هستم" : type === "Teacher" ? "مدرس هستم" : "نیاز به مدرک دارم"}</span>
                    </div>
                ))}
            </div>
            {userType === "certificate" && (
                <>
                    <div className='flex flex-col md:flex-row grow gap-5 justify-center items-end'>
                        <CustomInput rightLabel={"شماره شبا"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.shebaNumber} onChange={handleInputChange('shebaNumber')} />
                        <CustomInput rightLabel={"شماره کارت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.cardNumber} onChange={handleInputChange('cardNumber')} />
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
                </>
            )}
            {userType === "Teacher" && (
                <>
                    <div className='flex flex-col md:flex-row grow gap-5 justify-center items-end'>
                        <CustomInput rightLabel={"شماره شبا"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.shebaNumber} onChange={handleInputChange('shebaNumber')} />
                        <CustomInput rightLabel={"شماره کارت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.cardNumber} onChange={handleInputChange('cardNumber')} />
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
                        <CustomInput rightLabel={"درباره من"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.biography} onChange={handleInputChange('biography')} />
                        <CustomInput rightLabel={"گیت هاب"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.github} onChange={handleInputChange('github')} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"لینکدین"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.linkedin} onChange={handleInputChange('linkedin')} />
                        <CustomInput rightLabel={"تلگرام"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.telegram} onChange={handleInputChange('telegram')} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"اینستا"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.instagram} onChange={handleInputChange('instagram')} />
                        <CustomInput rightLabel={"توییتر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.twitter} onChange={handleInputChange('twitter')} />
                    </div>
                </>
            )}
            {userType === "company" && (
                <>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"نام شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.companyName} onChange={handleInputChange('companyName')} />
                        <CustomInput rightLabel={"کد  ثبت شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.registrationNumber} onChange={handleInputChange('registrationNumber')} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"کد اختصاصی شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={formData.economicCode} onChange={handleInputChange('economicCode')} />
                    </div>
                </>
            )}
            <DivButton className={`${selectedUser ? "bg-green-500" : "bg-orange-500"} text-textcolor w-full flex justify-center items-center`} onClick={handleSubmit}>
                {selectedUser ? "ثبت" : "ساخت کاربر"}
            </DivButton>
        </div>
    );
};

export default Profile;