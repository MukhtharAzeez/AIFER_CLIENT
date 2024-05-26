import { Link } from "react-router-dom";
import Title from "../shared/Title";
import { useState } from "react";

function Header() {
    const [selected, setSelected] = useState('Home')
    const links = [
      {
        title: "Home",
        link: "/",
      },
      {
        title: "Add readings",
        link: "/add-readings",
      },
      {
        title: "Pricing Plans",
        link: "/pricing",
      },
    ];
  return (
    <div className="w-full h-16 flex items-center">
      <div className="w-[50%]">
        <Title title="Power Dale" className="text-3xl font-bold pl-4" />
      </div>
      <div className="w-[50%] flex gap-8">
        {
          links.map((link, index) => (
            <Link  to={link.link} key={index} className={`hover:text-teal-800 ${selected === link.title ? "text-teal-800 font-semibold" : ""}`} onClick={() => setSelected(link.title)}>{link.title}</Link>
          ))
        }
      </div>
    </div>
  );
}

export default Header