import Head from 'next/head';

const page = () => {
    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4">
            <Head>
                <title>به زودی!</title>
                <meta name="description" content="وبسایت ما به زودی راه اندازی می شود!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='text-4xl font-bold text-black rtl mb-10'>
                <span className='text-white text-7xl'>هر</span>
                <span className=' text-7xl' style={{ color: "#3B82F6" }}>مس</span>
            </div>

            <h1 className="text-4xl font-bold text-black rtl" style={{ color: "#cccccc" }}>
                به زودی می رسیم!
            </h1>

            <div className="mt-8">
                <div className="bg-secondary hover:bg-opacity-75  font-bold py-2 px-4 rounded-full rtl justify-center text-center items-center flex" style={{ color: "#cccccc" }}>
                    وبسایت ما در حال ساخت است. برای راه اندازی آن با ما همراه باشید!
                </div>
            </div>
        </div>
    );
};

export default page;