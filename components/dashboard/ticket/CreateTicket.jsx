import CustomInput from "@/components/dashboard/CustomInput";
import CustomSelect from "@/components/dashboard/CustomSelect";
import DivButton from "@/components/dashboard/DivButton";

const CreateTicket = () => {
    return (
        <div className="flex w-full bg-primary p-4 rounded-lg">
            <div className="flex flex-col grow gap-3 bg-secondary p-3 rounded-lg">
                <div className={`flex flex-col md:flex-row gap-4 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
                    <CustomInput rightLabel="عنوان" containerClassName="w-full" />
                    <CustomSelect
                        rightLabel="عنوان"
                        placeholder="انتخاب کنید"
                        options={[
                            { value: '1', label: 'گزینه اول' },
                            { value: '2', label: 'گزینه دوم' },
                            { value: '3', label: 'گزینه سوم' },
                        ]}
                        containerClassName="w-full"
                        selectClassName="text-gray-700"
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
                    ></textarea>
                </div>
                <DivButton className="bg-green-500 text-textcolor justify-center">
                    <span>ایجاد تیکت</span>
                </DivButton>
            </div>
        </div>
    );
};

export default CreateTicket;