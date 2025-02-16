'use client'

import { useState, useEffect, useRef } from "react";
import usePostList from "@/hooks/post/usePostList";
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import { BiSolidEdit } from 'react-icons/bi';

const PostList = ({ setParentLoading, setSelectedPost, selectedPost }) => {


    const [posts, setPosts] = useState(null);
    const [postCount, setPostCount] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    const { postListRequest } = usePostList((posts, postsCount) => {
        setPosts(posts);
        setPostCount(postsCount);
    });


    useEffect(() => {
        setParentLoading(false);
        postListRequest(page, perPage);
    }, []);

    return (
        <div className='flex flex-col grow'>
            <div className='flex grow w-full overflow-x-scroll '>
                {posts &&
                    <Table
                        headers={["ID", "updatedAt", "auther", "title"]}
                        rowsData={["_id", "updatedAt", "auther.data.fullName", "title"]}
                        rows={posts}
                        rowClasses={(row, rowIndex) => {
                            return "bg-primary";
                        }}
                        cellClasses={(cell, cellIndex, row, rowIndex) => {
                            return cell == "ارسال شده" && "text-green-400";
                        }}
                        actionComponent={({ rowData, rowIndex }) => {
                            return (
                                <div className="flex h-full items-center justify-center gap-2 text-nowrap">
                                    <BiSolidEdit className='text-xl ml-4 text-blue-400' onClick={() => {
                                        setSelectedPost(rowData);
                                    }} />
                                </div>
                            );
                        }}
                        rowCountstart={(perPage * (page - 1))}
                    />
                }
            </div>
            <Pagination activePage={page} perPage={perPage} count={postCount} setActivePage={setPage} />
        </div>
    );
};

export default PostList;