import React from 'react';

const ApprovalDetails = ({ selectedRequest }) => {
    if (!selectedRequest) {
        return <div>اطلاعاتی برای نمایش موجود نیست.</div>;
    }

    const {
        user,
        method,
        url,
        urlMeta,
        headers,
        body,
        comment,
        file,
    } = selectedRequest;

    return (
        <div className="p-4 rounded shadow-md rtl ">
            <h2 className="text-xl font-bold mb-4">جزئیات درخواست</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">اطلاعات کاربر</h3>
                <p>نام کامل: {user?.data?.fullName || 'ناشناخته'}</p>
                <p>نام کاربری: {user?.userName || 'ناشناخته'}</p>
                <p>ایمیل: {user?.email || 'ناشناخته'}</p>
                <p>تاریخ ایجاد: {user?.createdAt || 'نامشخص'}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">جزئیات درخواست</h3>
                <p>روش: {method || 'نامشخص'}</p>
                <p>آدرس: {url || 'نامشخص'}</p>
                <p>نام آدرس: {urlMeta?.name || 'نامشخص'}</p>
            </div>


            {file?.mimetype?.startsWith("image/") && file?.buffer && (
                <div className='bg-secondary p-3 rounded-lg'>
                    <h3 className="text-lg font-semibold">تصویر آپلود شده</h3>
                    <div className="mb-4  flex justify-center items-center">
                        <img
                            src={`data:${file.mimetype};base64,${file.buffer.toString("base64")}`}
                            alt={file.originalname || "تصویر آپلود شده"}
                            className="rounded shadow max-w-full h-auto"
                        />
                    </div>
                </div>
            )}


            <div className="mb-4">
                <h3 className="text-lg font-semibold">بدنه درخواست</h3>
                {body ? (
                    <pre className="bg-secondary p-2 rounded overflow-x-auto">
                        {JSON.stringify(body, null, 2)}
                    </pre>
                ) : (
                    <p>بدنه‌ای وجود ندارد.</p>
                )}
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">فایل آپلود شده</h3>
                {file ? (
                    <>
                        <p>نام فایل: {file.originalname}</p>
                        <p>نوع فایل: {file.mimetype}</p>
                    </>
                ) : (
                    <p>فایلی آپلود نشده است.</p>
                )}
            </div>
            توضیحات:
            <div className="mb-4">
                <h3 className="text-lg font-semibold">نظر</h3>
                <p>{comment || 'ندارد'}</p>
            </div>
        </div>
    );
};

export default ApprovalDetails;
