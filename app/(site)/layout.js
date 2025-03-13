import Footer from "@/components/site/Footer/Footer";
import Header from "@/components/site/Header/Header";

export default function Layout({ children }) {
    return (
        <main className="text-ellipsis text-textcolor bg-primary flex flex-col items-center">
            <div className="hidden dark:block absolute top-0 h-[800px] w-full  bg-gradient-to-b from-white to-transparent opacity-10"></div>

            <div className="flex flex-col container  relative grow  justify-center w-full h-full max-w-[1288px] z-10">
                <Header />
                {children}
                <Footer />
            </div>
        </main>
    )
}
