'use client'

import { useState, useEffect, useRef } from 'react';
import General from '@/components/dashboard/certificate/General';
import { useParams } from 'next/navigation';
import useGetCertificateById from '@/hooks/certificate/useGetCertificateById';
import userHavePermission from '@/hooks/general/userHavePermission';

const page = () => {

    const params = useParams();
    const { certificate_id } = params;
    const [certificate, setCertificate] = useState(null);
    const certificateTemplateCheck = userHavePermission(["exam.certificateTemplate.NavigationMenu"]);

    const { getCertificateByIdRequest } = useGetCertificateById((cert) => {
        setCertificate(cert);
    }, () => { });


    useEffect(() => {
        if (certificate_id) {
            getCertificateByIdRequest(certificate_id);
        }
    }, [certificate_id]);

   

    return (
        <div className='flex flex-col grow rtl gap-3'>
            {certificate &&
                <>
                    {(certificate.cert_template_id.name == "General") && <General editMode={certificateTemplateCheck} data={certificate} />}
                </>
            }
        </div>
    );
};

export default page;