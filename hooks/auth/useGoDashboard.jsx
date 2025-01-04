import { useRouter } from 'next/navigation';

const useGoDashboard = () => {

    const { push } = useRouter();

    const goToDashboard = () => {
        // push('/dashboard');
    }

    return {
        goToDashboard
    };
};

export default useGoDashboard;
