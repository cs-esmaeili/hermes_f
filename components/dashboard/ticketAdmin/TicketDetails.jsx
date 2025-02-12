'use client'

import { useState, useEffect } from 'react';
import useAdminUpdateTicket from '@/hooks/adminTicket/useAdminUpdateTicket';
import useAdminGetTicketById from '@/hooks/adminTicket/useAdminGetTicketById';
import { useSelector } from 'react-redux';

const TicketDetails = ({ setParentLoading, selectedTicket, setSelectedTicket }) => {

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const userData = useSelector((state) => state.information.value);

    const { getAdminTicketByIdRequest } = useAdminGetTicketById((data) => {
        setSelectedTicket(data);
    });

    const { updateAdminTicketRequest } = useAdminUpdateTicket(() => {
        getAdminTicketByIdRequest(selectedTicket._id);
    });



    useEffect(() => {
        if (selectedTicket) {
            setComments(selectedTicket.comments || []);
        }
    }, [selectedTicket]);

    useEffect(() => {
        setParentLoading(false);
    }, [setParentLoading]);


    if (!selectedTicket) {
        return <div className={`flex grow justify-center items-center text-gray-300 p-4 ${process.env.NEXT_PUBLIC_DIRECTION}`}>تیکتی انتخاب نشده است.</div>;
    }

    return (
        <div className={`flex flex-col gap-4 p-6 bg-primary rounded-lg shadow-lg text-white ${process.env.NEXT_PUBLIC_DIRECTION}`}>
            <h2 className="text-2xl font-bold mb-4 text-center">{selectedTicket.subject}</h2>
            <div className="flex gap-4 justify-center items-center">
                <p className="text-gray-300">
                    <span className="font-semibold">وضعیت: </span>
                    {selectedTicket.status}
                </p>
                <p className="text-gray-300">
                    <span className="font-semibold">اولویت: </span>
                    {selectedTicket.priority}
                </p>
                <p className="text-gray-300">
                    <span className="font-semibold">تاریخ ایجاد: </span>
                    {new Date(selectedTicket.createdAt).toLocaleDateString()}
                </p>
            </div>

            <div className="bg-secondary p-3 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">افزودن کامنت جدید</h3>
                <textarea
                    className="w-full p-3 bg-primary border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-4"
                    rows="4"
                    placeholder="کامنت خود را وارد کنید..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    onClick={() => {
                        updateAdminTicketRequest({ ticket_id: selectedTicket._id, comment: newComment.trim() })
                    }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors"
                >
                    افزودن کامنت
                </button>
            </div>

            <div className="bg-secondary rounded-lg">
                {comments.length === 0 ? (
                    <p className="text-gray-500">هیچ کامنتی وجود ندارد.</p>
                ) : (
                    <ul className="space-y-4 ">
                        {comments.map((com, index) => (
                            <li
                                key={index}
                                className={`${(com.from._id != userData._id) && "!bg-gray-500"} p-4 bg-primary border border-gray-700 rounded-lg`}
                            >
                                <p className="mb-2">{com.comment}</p>

                                <div className='flex flex-col gap-3 mt-5'>
                                    <hr />
                                    <p className="text-sm text-gray-400">
                                        {typeof com.from === "object"
                                            && com.from.role_id.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        ارسال کننده:{" "}
                                        {typeof com.from === "object"
                                            ? com.from.data.fullName || com.from.username || com.from.email : com.from}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


        </div>
    );
};

export default TicketDetails;
