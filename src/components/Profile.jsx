import React, { useEffect } from "react";
import { useState } from "react";
import { UserAuth } from "./authentication";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { STORAGE } from "../fbconfig/connect";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Profile({ showProfile, setShowProfile, myBasket }) {
  const [btnLoading, setBtnLoading] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [allDetails, setAllDetails] = useState({});
  const [refCart, setRefCart] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState();

  const Submit = async () => {
    setBtnLoading(true);
    try {
      if (address === "") {
        alert("The Feild is empty");
      } else {
        for (let i = 0; i < myBasket.length; i++) {
          const currentTime =
            new Date().getHours() - 12 + ":" + new Date().getMinutes();
          const timeOfDay = +(new Date().getHours() > 12) ? "PM" : "AM";
          const date =
            new Date().getDate() +
            "-" +
            new Date().getMonth() +
            "-" +
            new Date().getFullYear();
          myBasket[i].j_OrderTimes = currentTime + timeOfDay + " " + date;
        }

        refCart.splice(refCart.length, 0, ...myBasket);
        await updateDoc(
          doc(STORAGE, "FashionNova Users", user && user?.email),
          {
            ...allDetails,
            d_PhoneNo: allDetails.d_PhoneNo || phoneNumber,
            e_Cart: [],
            f_OrderHistory: refCart,
            g_Address: address,
            h_OrderCount: orderCount + 1,
          }
        );
        navigate("/PaymentSuccess");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
    setBtnLoading(false);
  };

  useEffect(() => {
    if (user?.email) {
      const subscriber = onSnapshot(
        doc(STORAGE, "FashionNova Users", user?.email),
        (target) => {
          if (target.exists()) {
            setAllDetails(target.data());
            setRefCart(target.data().f_OrderHistory);
            setOrderCount(target.data().h_OrderCount);
            // console.log(target.data().e_Cart);
          } else {
            console.log("Document Doesn't Exists!");
          }
        }
      );
      return () => {
        subscriber();
      };
    }
  }, [user?.email]);

  return (
    <div
      className={` ${
        showProfile ? "block" : "hidden"
      } w-[100%] h-[100vh] fixed z-10 top-0 bg-black bg-opacity-50`}
    >
      <form className="relative w-[400px] mx-auto mt-16 rounded-lg max-w-[95%] p-5 bg-white">
        <button
          type="button"
          className="bg-red-600 text-white px-3 py-1 rounded-lg absolute right-5 -top-3"
          onClick={() => setShowProfile(!showProfile)}
        >
          Close
        </button>
        <div className="text-[25px] my-5 flex items-center justify-normal gap-2">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
            width={"40px"}
            className=" rounded-full"
          />
          <div className="">
            <span className="font-[200] px-1 rounded-md">FASHION</span>
            <span className="font-[800] border-2 px-1 py-0 rounded-md shadow mx-1">
              NOVA
            </span>
          </div>
        </div>
        <label htmlFor="" className="block ">
          <input
            type="text"
            className="border mt-5 px-2 py-1 rounded-md w-[100%]"
            placeholder="Name"
            value={allDetails.a_Name}
          />
        </label>
        <label htmlFor="" className="block ">
          <input
            type="text"
            className="border mt-5 px-2 py-1 rounded-md w-[100%]"
            placeholder="Mobile Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label htmlFor="" className="block ">
          <textarea
            name=""
            id=""
            className="border mt-5 px-2 py-1 rounded-md w-[100%]"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </label>
        <br />
        <button
          type="button"
          onClick={() => Submit()}
          className="mx-2 px-5 py-2 rounded-md bg-blue-600 text-white flex items-center justify-center gap-2"
        >
          {btnLoading ? (
            <>
              <AiOutlineLoading3Quarters className="spinner" /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default Profile;
