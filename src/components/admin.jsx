import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { STORAGE } from "../fbconfig/connect";
import { UserAuth } from "./authentication";
import { Link } from "react-router-dom";

function Admin() {
  const [allUsers, setAllUsers] = useState([]);
  const { user } = UserAuth();
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const datum = await getDocs(collection(STORAGE, "FashionNova Users"));
        const data = datum.docs.map((target) => ({
          id: target.id,
          ...target.data(),
        }));
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();
  }, [user?.email]);
  return (
    <div>
      {user && user?.email && user.email == "admin@gmail.com" ? (
        <>
          <div className="text-center font-[600] text-[20px] flex items-center gap-2 justify-center my-10">
            <div className="">
              <span className=" font-[200] m-1">FASHION</span>
              <span className=" font-[700] px-1 border-2 rounded-md py-0">
                NOVA
              </span>
            </div>
            <div className="">User's Details</div>
          </div>
          <div className="w-[1400px] mx-auto max-w-[100%]">
            <div className="w-[100%] grid grid-cols-5 bg-zinc-300">
              <div className="p-2 border">S.No</div>
              <div className="p-2 border">User Name</div>
              <div className="p-2 border">User Email</div>
              <div className="p-2 border">User Phone Number</div>
              <div className="p-2 border text-center">No of Orders</div>
            </div>
            {allUsers &&
              allUsers.map((target, index) => (
                <div key={index} className="w-[100%] grid grid-cols-5">
                  <div className="border p-2">{index + 1}</div>
                  <div className="border p-2">{target.a_Name}</div>
                  <div className="border p-2">{target.b_Email}</div>
                  <div className="border p-2">{target.d_PhoneNo}</div>
                  <div className="border p-2 text-center">
                    {target.h_OrderCount}
                  </div>
                </div>
              ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/" className=" px-3 py-1 rounded-md bg-black text-white">
              Back To Home
            </Link>
          </div>
        </>
      ) : (
        <div className="">
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://cdn.dribbble.com/users/550484/screenshots/2399482/403-anim.gif"
              className=" w-[600px] max-w-[100%]"
              alt=""
            />
            <div className="">
              Only Admin Can Access{" "}
              <Link
                to="/"
                className=" px-4 py-2 rounded-md bg-black text-white"
              >
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
