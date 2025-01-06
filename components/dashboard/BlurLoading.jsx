import Loading from '@/components/dashboard/Loading';

const BlurLoading = ({ loading = false }) => {
    if (loading) {
        return (
            <div className='absolute inset-0 flex justify-center items-center backdrop-blur-sm z-50 opacity-75'>
                <Loading loading={true} />
            </div>
        );
    } else {
        return null;
    }
};

export default BlurLoading;