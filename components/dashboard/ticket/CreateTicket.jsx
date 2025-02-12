'use client'

import { useState, useEffect } from 'react';
import CustomInput from "@/components/dashboard/CustomInput";
import CustomSelect from "@/components/dashboard/CustomSelect";
import DivButton from "@/components/dashboard/DivButton";
import useCreateTicket from "@/hooks/ticket/useCreateTicket";

const CreateTicket = ({ setParentLoading, setParentPage }) => {

    const [subject, setSubject] = useState('هاها');
    const [priority, setPriority] = useState('high');
    const [comment, setComment] = useState('این یک متن خیلی مهمه');

    const { createTicketRequest } = useCreateTicket(() => {
        setSubject("");
        setPriority("");
        setComment("");
        setParentPage("ticketList");
    });

    const handleSubmit = () => {
        const ticketData = {
            subject,
            priority,
            comment,
        };

        createTicketRequest(ticketData);
    };

    useEffect(() => {
        setParentLoading(false);
    }, []);

    return (
        <div className="flex w-full bg-primary p-4 rounded-lg">
            <div className="flex flex-col grow gap-3 bg-secondary p-3 rounded-lg">
                <div className={`flex flex-col md:flex-row gap-4 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
                    <CustomInput
                        rightLabel="عنوان"
                        containerClassName="w-full"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <CustomSelect
                        rightLabel="اولویت"
                        placeholder="انتخاب کنید"
                        options={[
                            { value: 'low', label: 'کم' },
                            { value: 'medium', label: 'متوسط' },
                            { value: 'high', label: 'زیاد' },
                        ]}
                        containerClassName="w-full"
                        selectClassName="text-gray-700"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                </div>

                <div className={`${process.env.NEXT_PUBLIC_DIRECTION} w-full`}>
                    <label htmlFor="comment" className="block text-textcolor font-medium mb-2">
                        توضیحات
                    </label>
                    <textarea
                        id="comment"
                        rows="4"
                        className="w-full bg-primary p-4 rounded-md focus:outline-none focus:ring focus:ring-accent"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>

                <DivButton onClick={handleSubmit} className="bg-green-500 text-textcolor justify-center">
                    <span>ایجاد تیکت</span>
                </DivButton>
            </div>
        </div>
    );
};

export default CreateTicket;
