'use client'

import { useState, useEffect, useRef } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import Icdl from '@/components/dashboard/certificate/General';

const CertificateTemplate = () => {

    const [page, setPage] = useState("ICDL");
    const [loading, setLoading] = useState(false);

    return (
        <div className='flex flex-col grow rtl gap-3 h-full'>

            <BlurLoading loading={loading} />

            <div className='flex w-1/6 '>
                <NavigationMenu
                    page={page}
                    setPage={(page) => { setLoading(true); setPage(page); }}
                    containerClass={"flex-col xl:pl-3"}
                    items={[
                        { page: "ICDL", icon: "certificate", label: "ICDL" },
                    ]}
                />
            </div>

            {(page == "ICDL") &&
                <Icdl editMode dijital={false} />
            }
        </div>
    );
};

export default CertificateTemplate;