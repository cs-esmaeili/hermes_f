import Part1 from "@/components/site/Home/Part1";
import Part2 from "@/components/site/Home/Part2";
import Part3 from "@/components/site/Home/Part3";


const Page = () => {
  return (
    <div className="flex flex-col grow py-10">

      <Part1 />
      <Part2 />
      {/* <Part3 /> */}

    </div>
  );
};

export default Page;
