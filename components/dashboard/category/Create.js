import { useState, useEffect } from 'react';
import { createCategory as RcreateCategory, updateCategory as RupdateCategory } from '@/services/Category';
import toast from 'react-hot-toast';
import translation from "@/translation/translation";

export default function CreateCategory({ categoryList, selectedCategory, setSelectedCategory }) {

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);

    const createCategory = async () => {
        try {
            const { data } = await RcreateCategory({ name });
            const { message } = data;
            toast.success(message);
            setName("");
            categoryList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    const updateCategory = async (child, parent, name) => {
        try {
            const { data } = await RupdateCategory({ child, parent, name });
            const { message } = data;
            toast.success(message);
            setSelectedCategory(null);
            categoryList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    useEffect(() => {
        if (selectedCategory != null) {
            setName(selectedCategory.name);
            setEditMode(true);
        } else {
            setName("");
            setEditMode(false);
        }
    }, [selectedCategory]);

    return (
        <div className='flex  relative bg-secondary h-[15rem]'>
            <div className='relative w-full bg-primary rounded-lg'>
                <div className='flex flex-col items-center max-h-fit  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='mb-2'>
                        <input
                            className='outline-0 bg-transparent border-solid border-2 border-l-0 border-t-0 border-r-0 text-center rounded-xl'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className='mt-2 w-full'>
                        <div className='flex mb-2'>
                            {selectedCategory ?
                                <button className={`bg-blue-500 text-white rounded-md p-1 w-full `}
                                    onClick={(e) => {
                                        updateCategory(selectedCategory._id, undefined, name);
                                    }}>
                                    {"بروز رسانی دسته بندی"}
                                </button>
                                :
                                <button className={`bg-yellow-500 text-white rounded-md p-1 w-full `}
                                    onClick={(e) => {
                                        createCategory();
                                    }}>
                                    {"ساخت دسته بندی"}
                                </button>
                            }
                        </div>
                        {editMode &&
                            <div>
                                <button className='bg-red-500 rounded-md p-1 w-full' onClick={() => setSelectedCategory(null)}>{"کنسل"}</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
