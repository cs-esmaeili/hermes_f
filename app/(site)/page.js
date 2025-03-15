import CollapsibleText from "@/components/general/CollapsibleText";
import Part1 from "@/components/site/Home/Part1";
import Part2 from "@/components/site/Home/Part2";
import Part3 from "@/components/site/Home/Part3";
import Part4 from "@/components/site/Home/Part4";
import Part5 from "@/components/site/Home/Part5";
import Part6 from "@/components/site/Home/Part6";
import Part7 from "@/components/site/Home/Part7";
import Part8 from "@/components/site/Home/Part8";
import CollapsibleMenu from "@/components/general/CollapsibleMenu";
import { AiFillAlipayCircle } from "react-icons/ai";

const menuItems = [
  {
    icon: <AiFillAlipayCircle />,
    title: "علوم کامپیوتر",
    subItems: [
      { title: "داده‌کاوی و یادگیری ماشین", isActive: false, url: "/courses/data-mining" },
      { title: "لینوکس", isActive: false, url: "/courses/linux" },
      { title: "پایتون (Python)", isActive: true, url: "/courses/python" },
      { title: "هوش مصنوعی", isActive: false, url: "/courses/ai" },
      { title: "شبکه‌های کامپیوتری", isActive: false, url: "/courses/networks" }
    ]
  },
  {
    icon: <AiFillAlipayCircle />,
    title: "طراحی و گرافیک",
  },
];


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
      {/* <CollapsibleMenu menuItems={menuItems} /> */}


    </div>
  );
};

export default Page;
