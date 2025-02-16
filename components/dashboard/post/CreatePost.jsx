'use client'

import { useState, useEffect, useRef } from 'react';

import DivButton from "@/components/dashboard/DivButton";
import MyEditor from "./MyEditor";
import { BsImage } from "react-icons/bs";
import CustomImage from "@/components/dashboard/CustomImage";
import CustomInput from '@/components/dashboard/CustomInput';
import { useModalContext } from '@/components/dashboard/Modal';
import useCreatePost from '@/hooks/post/useCreatePost';
import useUpdatePost from '@/hooks/post/useUpdatePost';
import Category from "@/app/dashboard/(main)/category/page";
import FileManager from '@/app/dashboard/(main)/filemanager/page';

const convertToFormData = (post) => {
    return {
        title: post?.title || "",
        disc: post?.disc || "",
        category_id: post?.category_id || "",
        categoryName: post?.categoryName || "انتخاب دسته بندی",
        body: post?.body || "",
        views: post?.views || "",
        metaTags: post?.metaTags || "",
        auther: post?.auther || "",
        imageH: post?.imageH?.url || null,
        imageV: post?.imageV?.url || null,
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (e) {
        return false;
    }
}

const CreatePost = ({ setParentLoading, setSelectedPost, selectedPost }) => {

    const [formData, setFormData] = useState(convertToFormData(selectedPost));
    const { openModal, closeModal } = useModalContext();
    const { createPostRequest } = useCreatePost();
    const { updatePostRequest } = useUpdatePost();


    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };


    useEffect(() => {
        if (setParentLoading) setParentLoading(false);
    }, []);

    return (
        <div className="w-full overflow-y-auto ">

            <div className="flex flex-col h-fit p-3 bg-primary rounded-lg gap-3 mb-8 ">

                <CustomInput containerClassName="rounded-lg" inputClassName="bg-secondary" rightLabel={"عنوان"} value={formData.title} onChange={handleInputChange('title')} />
                <CustomInput containerClassName="rounded-lg" inputClassName="bg-secondary" rightLabel={"توضیحات"} value={formData.disc} onChange={handleInputChange('disc')} />

                <div className="flex w-full gap-3 items-end">
                    <DivButton className="bg-red-500 h-full justify-center" onClick={(e) => {
                        openModal(<Category selectListener={(category) => {
                            setFormData((prev) => ({ ...prev, category_id: category._id }));
                            setFormData((prev) => ({ ...prev, categoryName: category.name }));
                            closeModal()
                        }} pickMode />)
                    }}>
                        {formData.categoryName}
                    </DivButton>
                </div>

                <div className='flex'>
                    <div className="flex flex-1 justify-center items-center p-3  min-h-56">
                        {formData.imageH ? (
                            <div className="relative">
                                <CustomImage
                                    src={isValidUrl(formData.imageH) ? formData.imageH : URL.createObjectURL(formData.imageH)}
                                    width={200}
                                    height={200}
                                    onClick={() => {
                                        openModal(<FileManager listener={(file) => {
                                            if (file?.type === "file") {
                                                setFormData({ ...formData, imageH: file.publicUrl })
                                                closeModal();
                                            }
                                        }} pickMode />)
                                    }}
                                />
                            </div>
                        ) : (
                            <BsImage className="text-5xl rounded" onClick={() => {
                                openModal(<FileManager listener={(file) => {
                                    if (file?.type === "file") {
                                        setFormData({ ...formData, imageH: file.publicUrl })
                                        closeModal();
                                    }
                                }} pickMode />)
                            }} />
                        )}

                    </div>
                    <div className='border-2' />
                    <div className="flex flex-1 justify-center items-center p-3  min-h-56">
                        {formData.imageV ? (
                            <div className="relative">
                                <CustomImage
                                    src={isValidUrl(formData.imageV) ? formData.imageV : URL.createObjectURL(formData.imageV)}
                                    width={200}
                                    height={200}
                                    onClick={() => {
                                        openModal(<FileManager listener={(file) => {
                                            if (file?.type === "file") {
                                                setFormData({ ...formData, imageV: file.publicUrl })
                                                closeModal();
                                            }
                                        }} pickMode />)
                                    }}
                                />
                            </div>
                        ) : (
                            <BsImage className="text-5xl rounded" onClick={() => {
                                openModal(<FileManager listener={(file) => {
                                    if (file?.type === "file") {
                                        setFormData({ ...formData, imageV: file.publicUrl })
                                        closeModal();
                                    }
                                }} pickMode />)
                            }} />
                        )}

                    </div>

                </div>
            </div>
            <MyEditor body={formData.body} onChangeContent={(editorContent) => {
                setFormData({ ...formData, body: editorContent });
            }} />
            <DivButton className={`w-full bg-green-500 p-3 rounded-md justify-center mt-5 ${selectedPost && "bg-yellow-500"}`} onClick={() => {
                if (selectedPost) {
                    updatePostRequest(formData, selectedPost._id);
                } else {
                    createPostRequest(formData);
                }
            }}>{selectedPost ? "ثبت تغییرات" : "ثبت"}</DivButton>
        </div>
    );
};

export default CreatePost;