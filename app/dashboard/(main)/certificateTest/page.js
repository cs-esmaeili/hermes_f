'use client'

import { useState, useEffect, useRef } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import VUserProfile from '@/components/dashboard/certificateTest/VUserProfile';
import CertificateList from '@/components/dashboard/certificateTest/CertificateList';

export default function certificateTest() {

    const [page, setPage] = useState("createCertificate");
    const [loading, setLoading] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);


    const scrollbarRef = useRef();


    useEffect(() => {
        if (selectedCert) {
            setPage("createCertificate");
        }
    }, [selectedCert]);
selectedCert
    return (
        <div className='flex flex-col flex-co p-5 w-full xl:flex-row-reverse relative grow gap-3 h-full overflow-auto' ref={scrollbarRef}>
            <BlurLoading loading={loading} />

            <div className='w-full h-fit xl:w-1/4'>
                <NavigationMenu
                    page={page}
                    setPage={(page) => { setLoading(true); setPage(page); }}
                    containerClass={"flex-col xl:pl-3"}
                    items={[
                        { page: "createCertificate", icon: "dashboard", label: "ساخت مدرک" },
                        { page: "certificateList", icon: "dashboard", label: "لیست مدارک" },
                    ]}
                />
            </div>

            <div className='w-full h-fit xl:w-3/4 flex-grow'>
                {(page == "createCertificate") &&
                    <VUserProfile setParentLoading={setLoading} scrollbarRef={scrollbarRef} setSelectedCert={setSelectedCert}
                        selectedCert={selectedCert} />
                }
                {(page == "certificateList") &&
                    <CertificateList setParentLoading={setLoading} scrollbarRef={scrollbarRef} setSelectedCert={setSelectedCert}
                        selectedCert={selectedCert} />
                }
            </div>
        </div>
    )
}
