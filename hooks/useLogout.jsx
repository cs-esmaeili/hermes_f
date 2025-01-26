import { deleteCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { setPermissions } from '@/state/permissions';
import { setinformation } from '@/state/information';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const useLogout = () => {

  const dispatch = useDispatch();
  const { push } = useRouter();


  const goOut = async () => {

    axios.defaults.headers.common["Authorization"] = `Bearer ${""}`;

    // Delete cookies
    deleteCookie('token');
    deleteCookie('userName');
    deleteCookie('sessionTime');


    dispatch(setPermissions(null));
    dispatch(setinformation(null));

    // Redirect to login page
    push('/dashboard/login');
  };

  return {
    goOut
  };
};

export default useLogout;
