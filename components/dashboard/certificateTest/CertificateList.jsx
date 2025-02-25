import { useState, useEffect, useRef } from "react";
import useCertificateList from "@/hooks/certificate/useCertificateList";
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import { BiSolidEdit } from 'react-icons/bi';
import Icon from "@/components/general/Icon";
import DivButton from "../DivButton";
import { useRouter } from 'next/navigation';

const CertificateList = ({ setSelectedCert, setParentLoading }) => {


    const [certificates, setCertificates] = useState(null);
    const [certificateCount, setCertificateCount] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const { push } = useRouter();


    const { certificateListRequest } = useCertificateList((certificates, certificateCount) => {
        setCertificates(certificates);
        setCertificateCount(certificateCount);
    });


    useEffect(() => {
        setParentLoading(false);
        certificateListRequest(page, perPage);

    }, []);

    return (
        <div className='flex flex-col grow'>
            <div className='flex grow w-full overflow-x-scroll '>
                {certificates &&
                    <Table
                        headers={["زمان ساخت", "وضعیت", "نام مدرک", "نام کاربر"]}
                        rowsData={["createdAt", "status", "name", "user.fullName"]}
                        rows={certificates}
                        rowClasses={(row, rowIndex) => {
                            return "bg-primary";
                        }}
                        cellClasses={(cell, cellIndex, row, rowIndex) => {
                            if (cellIndex == 1) {
                                return cell == "unpaid" ? "text-red-400" : "text-green-400";
                            }
                        }}
                        actionComponent={({ rowData, rowIndex }) => {
                            return (
                                <div className="flex h-full items-center justify-center gap-2 text-nowrap">

                                    {rowData.status != "paid" ?
                                        <DivButton className='!w-fit bg-blue-500 text-textcolor' onClick={() => {
                                            push(`/dashboard/certificate/${rowData._id}`)
                                        }} >
                                            <Icon name={"certificate"} className="w-6 h-6" />
                                            <span>دریافت مدرک</span>
                                        </DivButton>
                                        :
                                        <BiSolidEdit className='text-xl ml-4 text-blue-400' onClick={() => {
                                            setSelectedCert(rowData);
                                        }} />
                                    }
                                </div>
                            );
                        }}
                        rowCountstart={(perPage * (page - 1))}
                    />
                }
            </div>
            <Pagination activePage={page} perPage={perPage} count={certificateCount} setActivePage={setPage} />
        </div>
    );
};

export default CertificateList;