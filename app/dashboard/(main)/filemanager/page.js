'use client'

import CustomInput from "@/components/dashboard/CustomInput";
import DivButton from "@/components/dashboard/DivButton"
import Icon from "@/components/general/Icon";

export default function FileManager() {

    return (
        <div className='flex flex-col grow max-w-full gap-3'>
            <div className="flex flex-col bg-primary rounded-md gap-3 p-3">
                <div className="flex flex-row bg-secondary p-2">
                    <CustomInput value={"/temp/test/"} inputClassName={"ltr"} />
                </div>
                <div className="flex flex-row  gap-3">
                    <DivButton className={`bg-secondary !w-fit text-yellow-400 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
                        <Icon name={"addfolder"} className="w-8 h-8" />
                        <span>ساخت پوشه</span>
                    </DivButton>
                    <DivButton className={`bg-secondary !w-fit text-teal-400 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
                        <Icon name={"edit"} className="w-8 h-8" />
                        <span>تغییر نام</span>
                    </DivButton>
                    <DivButton className={`bg-secondary !w-fit text-red-400 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
                        <Icon name={"trash"} className="w-8 h-8" />
                        <span>حذف</span>
                    </DivButton>
                    <DivButton className={`bg-secondary !w-fit text-blue-400 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
                        <Icon name={"uploadfile"} className="w-8 h-8" />
                        <span>آپلود</span>
                    </DivButton>
                </div>
            </div>
            <div className="flex flex-col rounded-md gap-3 p-3">
                slam
            </div>
        </div>
    )
}
