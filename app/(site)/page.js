import CollapsibleText from "@/components/general/CollapsibleText";
import Part1 from "@/components/site/Home/Part1";
import Part2 from "@/components/site/Home/Part2";
import Part3 from "@/components/site/Home/Part3";
import Part4 from "@/components/site/Home/Part4";
import Part5 from "@/components/site/Home/Part5";
import Part6 from "@/components/site/Home/Part6";
import Part7 from "@/components/site/Home/Part7";
import Part8 from "@/components/site/Home/Part8";


const Page = () => {
  return (

    <div className="flex flex-col grow py-10 gap-10">
      <Part1 />
      <Part2 />
      <Part3 />
      <Part4 />
      <Part5 />
      <Part6 />
      <Part7 />
      <Part8 />
      <CollapsibleText />

    </div>
  );
};

export default Page;
