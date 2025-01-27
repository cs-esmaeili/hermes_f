'use client'

import Profile from '@/components/dashboard/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { setinformation } from '@/state/information';

const page = () => {

    const userData = useSelector((state) => state.information.value);
    const dispatch = useDispatch();

    return (
        <div className='flex grow h-full overflow-hidden '>
            <Profile selectedUser={userData} setSelectedUser={(data) => {
                dispatch(setinformation(data));
            }} />
        </div>
    );
};
export default page;