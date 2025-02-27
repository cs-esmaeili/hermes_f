'use client'

import { useState } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import Exam from '@/components/dashboard/ExamAndCert/Exam';
import Question from '@/components/dashboard/ExamAndCert/Question';
import Sessions from '@/components/dashboard/ExamAndCert/Sessions';
import userHavePermission from '@/hooks/general/userHavePermission';
import CertificateTemplate from '@/components/dashboard/ExamAndCert/CertificateTemplate';
import CertificateList from '@/components/dashboard/ExamAndCert/CertificateList';
import VUserProfile from '@/components/dashboard/ExamAndCert/VUserProfile';

const DashboardPage = () => {
    const [activePage, setActivePage] = useState("Sessions");
    const [loading, setLoading] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);

    const examCheck = userHavePermission(["exam.exam.NavigationMenu"]);
    const questionCheck = userHavePermission(["exam.question.NavigationMenu"]);
    const certificateTemplateCheck = userHavePermission(["exam.certificateTemplate.NavigationMenu"]);
    const groupCertificateCheck = userHavePermission(["exam.groupCertificate.NavigationMenu"]);
    const certificateListCheck = userHavePermission(["exam.certificateList.NavigationMenu"]);

    let items = [
        { page: "Sessions", icon: "list", label: "جلسات آزمون" },
    ];
    if (examCheck) items.push({ page: "exam", icon: "exam", label: "آزمون" });
    if (questionCheck) items.push({ page: "question", icon: "stack", label: "بانک سوال" });
    if (certificateTemplateCheck) items.push({ page: "CertTemplate", icon: "certificate", label: "قالب مدارک" });
    if (certificateListCheck) items.push({ page: "certificateList", icon: "list", label: "لیست مدارک" });
    if (groupCertificateCheck) items.push({ page: "GroupCertificate", icon: "certificate", label: "ساخت مدرک گروهی" });

    return (
        <div className='flex flex-col flex-co p-5 w-full xl:flex-row-reverse relative grow gap-3 h-full overflow-auto'>
            <BlurLoading loading={loading} />

            <div className='w-full h-fit xl:w-1/6'>
                <NavigationMenu
                    page={activePage}
                    setPage={(newPage) => {
                        // setLoading(true);
                        setActivePage(newPage);
                    }}
                    containerClass={"flex-col xl:pl-3"}
                    items={items}
                />
            </div>
            <div className='w-full h-full xl:w-3/4 flex-grow'>
                {activePage === "exam" && <Exam setParentLoading={setLoading} />}
                {activePage === "question" && <Question setParentLoading={setLoading} />}
                {activePage === "Sessions" && <Sessions setParentLoading={setLoading} />}
                {activePage === "CertTemplate" && <CertificateTemplate setParentLoading={setLoading} />}
                {activePage === "GroupCertificate" &&
                    <VUserProfile setParentLoading={setLoading} setSelectedCert={setSelectedCert}
                        selectedCert={selectedCert} />
                }
                {(activePage == "certificateList") &&
                    <CertificateList setParentLoading={setLoading} setSelectedCert={setSelectedCert}
                        selectedCert={selectedCert} />
                }
            </div>
        </div>
    );
};

export default DashboardPage;
