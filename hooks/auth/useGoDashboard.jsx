import { useRouter } from 'next/navigation';

const useSaveLogInData = () => {

    const { push } = useRouter();

    const goToDashboard = () => {
        push('/dashboard');
    }

    return {
        goToDashboard
    };
};

export default useSaveLogInData;
