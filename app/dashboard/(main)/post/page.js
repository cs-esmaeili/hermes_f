'use client'

import { useState, useEffect, useRef } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import PostList from "@/components/dashboard/post/PostList";
import CreatePost from '@/components/dashboard/post/CreatePost';


const page = () => {

    const [selectedPost, setSelectedPost] = useState(null);
    const [page, setPage] = useState("createPost");
    const [loading, setLoading] = useState(false);
 
    const scrollbarRef = useRef();

    useEffect(() => {
        if (selectedPost) {
            setPage("createPost");
        }
    }, [selectedPost]);

    return (
        <div className='flex flex-col  p-5 w-full relative grow gap-3 h-full overflow-auto' ref={scrollbarRef}>
            <BlurLoading loading={loading} />

            <div className='w-full h-fit justify-center items-center flex'>
                <NavigationMenu
                    page={page}
                    setPage={(page) => { setLoading(true); setPage(page); }}
                    containerClass={"flex xl:pl-3"}
                    items={[
                        { page: "createPost", icon: "dashboard", label: "مطلب جدید" },
                        { page: "postList", icon: "dashboard", label: "لیست مطالب" },
                    ]}
                />
            </div>
            <div className='w-full h-fit  flex-grow'>
                {(page == "createPost") &&
                    <CreatePost selectedPost={selectedPost} setSelectedPost={setSelectedPost} setParentLoading={setLoading} />
                }

                {(page == "postList") &&
                    <PostList selectedPost={selectedPost} setSelectedPost={setSelectedPost} setParentLoading={setLoading} />
                }
            </div>
        </div>
    );
};

export default page;