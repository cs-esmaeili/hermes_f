import Part1 from "@/components/site/Home/Part1";
import Part2 from "@/components/site/Home/Part2";
import Part3 from "@/components/site/Home/Part3";
import Part4 from "@/components/site/Home/Part4";
import Part5 from "@/components/site/Home/Part5";
import Part6 from "@/components/site/Home/Part6";


const Page = () => {
  return (
    <div className="flex flex-col grow py-10 gap-10">

      {/* <div className="font-extrablack text-9xl">
        بهر خران چه کاه برند چه زعفران
      </div> */}


      <Part1 />
      <Part2 />
      <Part3 />
      <Part4 />
      <Part5 />
      <Part6 />


    </div>
  );
};

export default Page;
