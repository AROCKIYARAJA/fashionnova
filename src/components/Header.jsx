import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./authentication";
import { CiMenuFries } from "react-icons/ci";
import { MdDashboard, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { doc, onSnapshot } from "firebase/firestore";
import { STORAGE } from "../fbconfig/connect";
import { FaOpencart } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import SlideMenu from "./SlideMenu";

function Header() {
  const [profile, setProfile] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const { user, RemoveAccount, LoginAccount } = UserAuth();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      RemoveAccount();
      setProfile(!profile);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        const fetchuser = onSnapshot(
          doc(STORAGE, "FashionNova Users", user?.email),
          (target) => {
            if (target.exists()) {
              setUserData(target.data());
            }
          }
        );
        return () => {
          fetchuser();
        };
      }
    };

    fetchUserData();
  }, [user?.email]);

  return (
    <>
      <div className=" flex xl:px-20 sm:px-10 px-5 py-[6px] items-center bg-black bg-opacity-30 justify-between backdrop-blur-xl w-full top-0 z-50">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-black md:text-[25px] md:font-[200] font-[300]">
              FASHION
            </span>
            <span className=" border border-black px-1 text-black w-fit md:h-[30px] h-[25px] leading-[25px] md:leading-[30px] md:text-[25px] font-[800] py-0 rounded-lg">
              NOVA
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {user && user ? (
            <div
              className="md:flex hidden items-center relative  justify-between gap-7 bg-white bg-opacity-15 backdrop-blur-xl rounded-3xl px-2 py-1 cursor-pointer scale-[0.85]"
              onClick={() => setProfile(!profile)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={
                    userData.g_profile ||
                    "https://www.sekolahalbunyan.sch.id/wp-content/plugins/elementskit/widgets/yelp/assets/images/profile-placeholder.png"
                  }
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
                <p className="flex flex-col text-white ">
                  <span className="text-[15px] tracking-wider">
                    {userData && userData.a_Name}
                  </span>
                  <span className="text-[12px] tracking-wider text-gray-300">
                    {user && user?.email}
                  </span>
                </p>
              </div>
              <div className="text-white">
                <MdOutlineKeyboardArrowDown
                  className={`text-2xl transition-all duration-300 ${
                    profile ? "rotate-180" : "rotate-360"
                  }`}
                />
              </div>
            </div>
          ) : (
            <Link
              to="/Login"
              className="px-4 py-1 text-zinc-100 bg-red-600 rounded-3xl"
            >
              Login
            </Link>
          )}
          <div
            className={` ${
              profile
                ? `block bg-zinc-800 bg-opacity-50 backdrop-blur-xl`
                : `hidden`
            } absolute z-10 px-2 w-[185px] top-14 translate-x-6 rounded-xl transition-all duration-300`}
          >
            <div
              className=" flex items-center gap-2 my-2 py-1 px-2 rounded-lg text-white hover:bg-zinc-700 cursor-pointer"
              onClick={() => {
                navigate("/Orders");
              }}
            >
              <CiBoxList /> Orders
            </div>
            {user && user?.email && user.email === "admin@gmail.com" ? (
              <>
                <div
                  className=" flex items-center gap-2 my-2 py-1 px-2 rounded-lg text-white hover:bg-zinc-700 cursor-pointer"
                  onClick={() => {
                    navigate("/FashionNova/admin");
                  }}
                >
                  <MdDashboard /> Dashboard
                </div>
              </>
            ) : null}

            <button
              type="button"
              onClick={() => handleSubmit()}
              className="w-full flex items-center gap-2 my-2 py-1 px-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
            >
              <IoLogOut /> Logout
            </button>
          </div>
          {user && user?.email && (
            <Link
              to="/FashionNova/CartPage"
              className=" hidden  px-3 py-2 rounded-full md:flex items-center gap-2 relative"
            >
              <FaOpencart className=" text-[1.5rem]" />{" "}
              <span className="px-2 py-[2px] absolute top-0 right-0 bg-red-600 text-white rounded-full text-[12px]">
                {userData && userData.e_Cart && userData.e_Cart.length}
              </span>
            </Link>
          )}
          <div
            onClick={() => setSideBar(!sideBar)}
            className="md:hidden block text-white hover:text-red-500 rounded-lg px-1 py-1"
          >
            <CiMenuFries className="text-2xl" />
          </div>
        </div>
      </div>

      <SlideMenu  setSideBar={setSideBar} sideBar={sideBar} user={user} setProfile={setProfile} profile={profile} userData={userData} />
    </>
  );
}

export default Header;
