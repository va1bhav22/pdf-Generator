import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const Navbar = () => {
  return (
    <section className="public-container py-10">
      <div className=" bg-[#D9D9D90D] border border-[#D9D9D912]  p-2 rounded-full flex items-center gap-10">
        <img src="/pdf.png" alt="" className="h-10 w-10" />
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-5">
            {navMenu?.map((menus) => (
              <Link key={menus.id} href={menus.route}>
                <p className="text-white tracking-wide">{menus.title}</p>
              </Link>
            ))}
          </div>
          <button className="bg-white py-2 px-3 text-sm rounded-full flex items-center gap-1">
            Get Started{" "}
            <span>
              <IoIosArrowRoundForward size={25} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
const navMenu = [
  { id: 1, title: "Home", route: "/" },
  { id: 2, title: "Pdf list", route: "/pdf-lists" },
];
