import React from "react";
import { CiBoxList, CiLogout, CiMenuFries } from "react-icons/ci";
import { FaOpencart } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./authentication";

function SlideMenu({
  setSideBar,
  sideBar,
  user,
  setProfile,
  profile,
  userData,
}) {
  const navigate = useNavigate();
  const { RemoveAccount, LoginAccount } = UserAuth();

  async function handleSubmit() {
    try {
      RemoveAccount();
      // setProfile(!profile);
      setSideBar(!sideBar);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div
      className={` w-[667px] max-w-[100%] bg-white h-[100vh] p-5 fixed z-[50] top-0 ${
        sideBar ? "right-0" : "right-[-667px]"
      }`}
    >
      <div className="flex items-center justify-center gap-1 relative">
        <span className=" font-[200] ">FASHION</span>
        <span className=" font-[700] border-2 px-1 py-0 rounded-md">NOVA</span>
        <button
          onClick={() => setSideBar(!sideBar)}
          className=" absolute sm:right-5 right-0 px-2 py-0 text-[14px] rounded bg-red-600 text-white"
        >
          Close
        </button>
      </div>
      <div className="">
        {user && user ? (
          <>
            <div className="flex gap-4 items-center justify-normal mt-10">
              <img
                src="https://www.sekolahalbunyan.sch.id/wp-content/plugins/elementskit/widgets/yelp/assets/images/profile-placeholder.png"
                alt=""
                className="w-[50px] rounded-full"
              />
              <div className="flex flex-col ">
                <div className="font-[500] text-[18px] w-full">
                  {userData && userData.a_Name}
                </div>
                <div className="font-[400] text-[15px] w-full">
                  {user && user?.email}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8 flex-col gap-3">
              <div className="w-full">
                <Link
                  to="/Orders"
                  className="px-3 bg-slate-200 py-2 rounded-md flex items-center gap-2 "
                >
                  <CiBoxList /> Orders
                </Link>
              </div>
              {user && user?.email && user.email === "admin@gmail.com" ? (
                <div className="w-full">
                  <Link
                    to="/FashionNova/admin"
                    className="px-3 bg-slate-200 py-2 rounded-md flex items-center gap-2 "
                  >
                    <MdDashboard /> Dashboard
                  </Link>
                </div>
              ) : null}
              <div className="w-full">
                <Link
                  to="/FashionNova/CartPage"
                  className="px-3 bg-slate-200 py-2 rounded-md flex items-center gap-2 "
                >
                  <span className="px-2 py-[2px]  bg-red-600 text-white rounded-full text-[12px]">
                    {userData && userData.e_Cart && userData.e_Cart.length}
                  </span>
                  Cart <FaOpencart className=" text-[1.5rem]" />{" "}
                </Link>
              </div>
              <div className="w-full">
                <button
                  onClick={() => handleSubmit()}
                  className="w-full px-3 bg-red-500 py-2 rounded-md flex items-center gap-2 text-white "
                >
                  <CiLogout /> LogOut
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className=" text-center mt-10">
              <Link to="/Login" className="bg-red-600 text-white px-5 py-1">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SlideMenu;
