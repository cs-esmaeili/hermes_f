import Header from "@/components/site/Header";

export default function Layout({ children }) {
    return (
        <main className="text-ellipsis text-textcolor bg-primary flex flex-col items-center">
            <div className="flex flex-col container  relative grow  justify-center overflow-hidden  w-full h-full max-w-[1288px]">
                <Header />
                {children}
            </div>
        </main>
    )
}
