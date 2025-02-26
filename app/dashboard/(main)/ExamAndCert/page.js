'use client'

import { useState } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import Exam from '@/components/dashboard/exam/Exam';
import Question from '@/components/dashboard/exam/Question';
import Sessions from '@/components/dashboard/exam/Sessions';
import userHavePermission from '@/hooks/general/userHavePermission';
import CertificateTemplate from '@/components/dashboard/ExamAndCert/CertificateTemplate';
import GroupCertificate from '@/components/dashboard/ExamAndCert/GroupCertificate';

const DashboardPage = () => {
    const [activePage, setActivePage] = useState("Sessions");
    const [loading, setLoading] = useState(false);

    const examCheck = userHavePermission(["exam.exam.NavigationMenu"]);
    const questionCheck = userHavePermission(["exam.question.NavigationMenu"]);
    const certificateTemplateCheck = userHavePermission(["exam.certificateTemplate.NavigationMenu"]);
    const groupCertificateCheck = userHavePermission(["exam.groupCertificate.NavigationMenu"]);

    let items = [
        { page: "Sessions", icon: "list", label: "آزمون ها" },
        ,
    ];
    if (examCheck) items.push({ page: "exam", icon: "add", label: "ساخت آزمون" });
    if (questionCheck) items.push({ page: "question", icon: "stack", label: "بانک سوال" });
    if (certificateTemplateCheck) items.push({ page: "CertTemplate", icon: "certificate", label: "قالب مدارک" });
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
                {activePage === "GroupCertificate" && <GroupCertificate setParentLoading={setLoading} />}
            </div>
        </div>
    );
};

export default DashboardPage;
