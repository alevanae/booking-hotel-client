import { useContext } from "react";

import userContext from "../contextAPI";
import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";
const navBarData = [
  {
    type: "Stays",
    icon: "fa-bed",
    active: true,
  },
  {
    type: "Flights",
    icon: "fa-plane",
    active: false,
  },
  {
    type: "Car rentals",
    icon: "fa-car",
    active: false,
  },
  {
    type: "Attractions",
    icon: "fa-bed",
    active: false,
  },
  {
    type: "Airport taxis",
    icon: "fa-taxi",
    active: false,
  },
];

function NavBar() {
  const { isLogin } = useContext(userContext);
  return (
    <>
      {isLogin ? <AfterLogin /> : <BeforeLogin />}
      <ul className="flex justify-start items-center gap-4 px-4 py-4 w-full bg-blue-700 text-white text-[24px]">
        {navBarData.map((item, i) => (
          <li
            key={i}
            className={`nav-bar-item ${
              item.active ? "rounded-full border border-white px-2 py-1" : ""
            }`}>
            <i className={`fa ${item.icon} p-1`}></i>
            <span>{item.type}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
export default NavBar;
