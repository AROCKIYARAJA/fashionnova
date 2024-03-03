import React, { useEffect } from "react";
import Header from "./Header";
import { UserAuth } from "./authentication";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { STORAGE } from "../fbconfig/connect";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PurchaseItem } from "./PurchaseList";
import { CiBoxes } from "react-icons/ci";

function Orders() {
  const { user } = UserAuth();
  const [allDetails, setAllDetails] = useState({});
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [show, setShow] = useState(false);

  async function clearHistory() {
    setPurchaseHistory([]);
    updateDoc(doc(STORAGE, "FashionNova Users", user && user?.email), {
      ...allDetails,
      f_OrderHistory: [],
    });
  }

  useEffect(() => {
    if (user && user?.email) {
      const subscriber = onSnapshot(
        doc(STORAGE, "FashionNova Users", user?.email),
        (target) => {
          if (target.exists()) {
            setAllDetails(target.data());
            setPurchaseHistory(target.data().f_OrderHistory);
          }
        }
      );
      return () => {
        subscriber();
      };
    }
  }, [user?.email]);
  return (
    <div className="">
      <Header />
      <div className="w-[1300px] max-w-[95%] mx-auto mt-10">
        <div className=" flex items-center justify-between gap-2 flex-wrap">
          <div className="font-[700] text-[20px] flex items-center gap-2">
            <CiBoxes className="text-[2rem] " /> Purchase History
          </div>
          <div className="">
            <button
              onClick={() => clearHistory()}
              className="sm:px-4 py-1 px-2 rounded-md bg-red-600 text-white"
            >
              Clear History
            </button>
          </div>
        </div>{" "}
        <br />
        {user && purchaseHistory && purchaseHistory.length === 0 ? (
          <div className="font-[600] text-center mt-10">No Records Found</div>
        ) : (
          purchaseHistory
            .reverse()
            .map((target, index) => (
              <PurchaseItem key={index} content={target} index={index} />
            ))
        )}
      </div>
    </div>
  );
}

export default Orders;
