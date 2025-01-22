import { useState, useEffect, useRef } from "react";
import CustomInput from '../CustomInput';
import { BsImage } from "react-icons/bs";
import InputDatePicker from '../InputDatePicker';
import { BsCake2 } from "react-icons/bs";
import Lottie from "lottie-react";
import Teacher from '@/public/assets/animations/teacher.json';
import Company from '@/public/assets/animations/company.json';
import Degree from '@/public/assets/animations/degree.json';
import PickFile from "../PickFile";
import CustomImage from "../CustomImage";
import useChangeAvatar from "@/hooks/user/useChangeAvatar";
import useUpdateUserData from "@/hooks/user/useUpdateUserData";
import useUserInformation from "@/hooks/user/useUserInformation";
import DivButton from "../DivButton";
import { useSelector } from 'react-redux';

const CreateUser = ({ setParentLoading, scrollbarRef }) => {

    const [userType, setUserType] = useState('normal');
    const pickFileRef = useRef(null);


    const userData = useSelector((state) => state.information.value.data);
    const [file, setFile] = useState(userData?.image?.url || null);
    const [fullName, setFullName] = useState(userData.fullName || "");
    const [nationalCode, setNationalCode] = useState(userData.nationalCode || "");
    const [birthday, setBirthday] = useState(userData.birthday || "");
    const [shebaNumber, setShebaNumber] = useState(userData.shebaNumber || "");
    const [cardNumber, setCardNumber] = useState(userData.cardNumber || "");
    const [fatherName, setFatherName] = useState(userData.fatherName || "");
    const [companyName, setCompanyName] = useState(userData.companyName || "");
    const [economicCode, setEconomicCode] = useState(userData.economicCode || "");
    const [registrationNumber, setRegistrationNumber] = useState(userData.registrationNumber || "");
    const [postalCode, setPostalCode] = useState(userData.postalCode || "");
    const [ostan, setOstan] = useState(userData.ostan || "");
    const [shahr, setShahr] = useState(userData.shahr || "");
    const [github, setGithub] = useState(userData.github || "");
    const [linkedin, setLinkedin] = useState(userData.linkedin || "");
    const [telegram, setTelegram] = useState(userData.telegram || "");
    const [instagram, setInstagram] = useState(userData.instagram || "");
    const [twitter, setTwitter] = useState(userData.twitter || "");
    const [address, setAddress] = useState(userData.address || "");
    const [biography, setBiography] = useState(userData.biography || "");


    const { userInformationRequest } = useUserInformation();

    const { changeAvatarRequest } = useChangeAvatar(() => {
        setFile(null);
        userInformationRequest();
    });
    const { updateUserDataRequest } = useUpdateUserData(() => {
        userInformationRequest();
    });

    useEffect(() => {
        if (userType != "normal") {
            scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
        }
    }, [userType]);

    useEffect(() => {
        setParentLoading(false);
        userInformationRequest();
    }, []);

    useEffect(() => {
        if (userData) {
            setFile(userData?.image?.url || null);

            setFullName(userData.fullName || "");
            setNationalCode(userData.nationalCode || "");
            setBirthday(userData.birthday || "");
            setShebaNumber(userData.shebaNumber || "");
            setCardNumber(userData.cardNumber || "");
            setFatherName(userData.fatherName || "");
            setCompanyName(userData.companyName || "");
            setEconomicCode(userData.economicCode || "");
            setRegistrationNumber(userData.registrationNumber || "");
            setPostalCode(userData.postalCode || "");
            setOstan(userData.ostan || "");
            setShahr(userData.shahr || "");
            setGithub(userData.github || "");
            setLinkedin(userData.linkedin || "");
            setTelegram(userData.telegram || "");
            setInstagram(userData.instagram || "");
            setTwitter(userData.twitter || "");
            setAddress(userData.address || "");
            setBiography(userData.biography || "");
        }
    }, [userData]);

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <div className='flex flex-col grow h-fit overflow-hidden gap-3 bg-primary rounded-xl p-5'>
            <div className='flex flex-col-reverse md:flex-row grow gap-5'  >
                <div className='flex flex-col w-full md:w-4/6 gap-3'>
                    <CustomInput rightLabel={"نام و نام خانوادگی (فارسی)"} inputClassName={"bg-secondary"} value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                    <CustomInput rightLabel={"کد ملی"} inputClassName={"bg-secondary"} value={nationalCode} onChange={(e) => { setNationalCode(e.target.value) }} />
                    <CustomInput rightLabel={"نام پدر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={fatherName} onChange={(e) => { setFatherName(e.target.value) }} />
                    <InputDatePicker icon={<BsCake2 />} value={birthday} onChange={(time) => setBirthday(time)} />
                </div>
                <div className='flex items-center justify-center bg-secondary w-full md:w-2/6 py-10 md:p-5 xl:p-10 rounded-md'>
                    <PickFile ref={pickFileRef} fileSelectListener={(file) => {
                        setFile(file);
                    }} />

                    {file ?
                        <div className="relative">
                            <CustomImage src={(isValidUrl(file)) ? file : URL.createObjectURL(file)} width={200} height={200} onClick={() => {
                                pickFileRef.current.openFilePicker();
                            }} />
                            <DivButton className="flex w-full items-center justify-center bg-purple-500 mt-3" onClick={() => {
                                changeAvatarRequest(file);
                            }}>
                                ثبت
                            </DivButton>
                        </div>
                        :
                        <BsImage className='text-5xl rounded' onClick={() => {
                            pickFileRef.current.openFilePicker();
                        }} />
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 grow">
                <div
                    className={`flex flex-col bg-secondary rounded-lg p-3 justify-center items-center border-2 border-transparent hover:border-accent ${userType == "company" && "!border-accent"}`}
                    onClick={() => {
                        if (userType == "company") {
                            setUserType("normal");
                            return;
                        }
                        setUserType("company");
                    }}>
                    <Lottie animationData={Company} className="w-1/2 h-60" />
                    <span>شرکت / حقوقی هستم</span>
                </div>
                <div
                    className={`flex flex-col bg-secondary rounded-lg p-3 justify-center items-center border-2 border-transparent hover:border-accent ${userType == "teacher" && "!border-accent"}`}
                    onClick={() => {
                        if (userType == "teacher") {
                            setUserType("normal");
                            return;
                        }
                        setUserType("teacher");
                    }}>
                    <Lottie animationData={Teacher} className="w-1/2 h-60" />
                    <span>مدرس هستم</span>
                </div>
                <div
                    className={`sm:col-span-2 md:col-span-1 flex flex-col bg-secondary rounded-lg p-3 justify-center items-center border-2 border-transparent hover:border-accent ${userType == "degree" && "!border-accent"}`}
                    onClick={() => {
                        if (userType == "degree") {
                            setUserType("normal");
                            return;
                        }
                        setUserType("degree");
                    }}
                >
                    <Lottie animationData={Degree} className="w-1/2 h-60" />
                    <span>نیاز به مدرک دارم</span>
                </div>
            </div>
            {(userType == "degree") &&
                <>
                    <div className='flex flex-col md:flex-row grow gap-5 justify-center items-end'>
                        <CustomInput rightLabel={"شماره شبا"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={shebaNumber} onChange={(e) => { setShebaNumber(e.target.value) }} />
                        <CustomInput rightLabel={"شماره کارت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={cardNumber} onChange={(e) => { cardNumber(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"استان"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={ostan} onChange={(e) => { setOstan(e.target.value) }} />
                        <CustomInput rightLabel={"شهر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={shahr} onChange={(e) => { setShahr(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"آدرس"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"کد پستی"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={postalCode} onChange={(e) => { setPostalCode(e.target.value) }} />
                    </div>
                </>
            }
            {(userType == "teacher") &&
                <>
                    <div className='flex flex-col md:flex-row grow gap-5 justify-center items-end'>
                        <CustomInput rightLabel={"شماره شبا"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={shebaNumber} onChange={(e) => { setShebaNumber(e.target.value) }} />
                        <CustomInput rightLabel={"شماره کارت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"استان"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={ostan} onChange={(e) => { setOstan(e.target.value) }} />
                        <CustomInput rightLabel={"شهر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={shahr} onChange={(e) => { setShahr(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"آدرس"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"کد پستی"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={postalCode} onChange={(e) => { setPostalCode(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"درباره من"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={biography} onChange={(e) => { setBiography(e.target.value) }} />
                        <CustomInput rightLabel={"گیت هاب"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={github} onChange={(e) => { setBiography(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"لینکدین"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={linkedin} onChange={(e) => { setLinkedin(e.target.value) }} />
                        <CustomInput rightLabel={"تلگرام"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={telegram} onChange={(e) => { setTelegram(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"اینستا"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={instagram} onChange={(e) => { setInstagram(e.target.value) }} />
                        <CustomInput rightLabel={"توییتر"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={twitter} onChange={(e) => { setTwitter(e.target.value) }} />
                    </div>

                </>
            }
            {(userType == "company") &&
                <>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"نام شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />
                        <CustomInput rightLabel={"کد  ثبت شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={registrationNumber} onChange={(e) => { setRegistrationNumber(e.target.value) }} />
                    </div>
                    <div className='flex flex-col md:flex-row grow gap-5'>
                        <CustomInput rightLabel={"کد اختصاصی شرکت"} inputClassName={"bg-secondary"} containerClassName={"w-full"} value={economicCode} onChange={(e) => { setEconomicCode(e.target.value) }} />
                    </div>
                </>
            }
            <DivButton className="bg-green-500 text-textcolor w-full flex justify-center items-center" onClick={() => {
                updateUserDataRequest({
                    address, fullName, nationalCode, birthday, shebaNumber, cardNumber
                    , fatherName, companyName, economicCode, registrationNumber, postalCode
                    , ostan, shahr, github, linkedin, telegram, instagram, twitter, biography
                });
            }}>
                ثبت
            </DivButton>
        </div>
    );
};

export default CreateUser;