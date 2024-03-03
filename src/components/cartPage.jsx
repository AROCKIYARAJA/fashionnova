import React, { useEffect, useReducer } from "react";
import { UserAuth } from "./authentication";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { STORAGE } from "../fbconfig/connect";
import { Link } from "react-router-dom";
import { FaShop } from "react-icons/fa6";
import Header from "./Header";
import Profile from "./Profile";

function CartPage() {
  const { user } = UserAuth();
  const [myBasket, setMyBasket] = useState([]);
  const [allDetails, setAllDetails] = useState({});
  const [showProfile, setShowProfile] = useState(false);

  const updateCartInFirestore = (cart) => {
    if (user?.email) {
      try {
        updateDoc(doc(STORAGE, "FashionNova Users", user.email), {
          e_Cart: cart,
        });
      } catch (error) {
        console.error("Error updating cart in Firestore:", error);
      }
    }
  };

  const cartReducer = (state, action) => {
    if (action.type === "INCREMENT_QUANTITY") {
      const updatedCartInc = myBasket.map((target) =>
        target.a_id === action.payload.id
          ? {
              ...target,
              g_quantity: target.g_quantity + 1,
              h_qunt_price: target.c_price * (target.g_quantity + 1),
            }
          : target
      );
      updateCartInFirestore(updatedCartInc);
    } else if (action.type === "DECREMENT_QUANTITY") {
      const updatedCartInc = myBasket
        .map((target) =>
          target.a_id === action.payload.id
            ? {
                ...target,
                g_quantity: target.g_quantity > 0 ? target.g_quantity - 1 : 0,
                h_qunt_price: target.c_price * (target.g_quantity - 1),
              }
            : target
        )
        .filter((target) => target.g_quantity !== 0);
      updateCartInFirestore(updatedCartInc);
    } else {
      console.log("Invalid Approach!");
    }
  };

  const [cartState, dispatch] = useReducer(cartReducer, []);
  useEffect(() => {
    if (user?.email) {
      const subscriber = onSnapshot(
        doc(STORAGE, "FashionNova Users", user?.email),
        (target) => {
          if (target.exists()) {
            setMyBasket(target.data().e_Cart || []);
            setAllDetails(target.data());
          } else {
            console.log("Document Doesn't Exists!");
            setMyBasket([]);
          }
        }
      );
      return () => {
        subscriber();
      };
    }
  }, [user?.email]);

  return (
    <>
      <Header />
      <div className="">
        <div className=" text-center font-[600] md:text-[30px] text-[20px]">
          Cart
        </div>

        <div className="flex flex-col gap-10 w-[1000px] max-w-[100%] mx-auto mt-10">
          {myBasket && myBasket.length === 0 ? (
            <div className="text-center sm:text-[2rem] text-[1.2rem] font-[700] ">
              Basket is Empty
            </div>
          ) : (
            myBasket.map((target, index) => (
              <div
                key={index}
                id={index}
                className="flex sm:flex-nowrap flex-wrap sm:justify-normal justify-center gap-8 border-b px-3 pt-2 pb-5"
              >
                <div className="flex items-center">{index + 1})</div>
                <img
                  className=" rounded-md"
                  src={target.e_image[0].slice(
                    target.e_image[0].indexOf("h"),
                    target.e_image[0].lastIndexOf("g") + 1
                  )}
                  alt=""
                  width={"120px"}
                />
                <div className="w-full flex justify-between flex-wrap">
                  <div className="flex flex-col justify-between text-[14px]">
                    <div className=" font-[600] ">{target.b_title}</div>
                    <div className=" w-fit">Price : ${target.c_price}</div>
                    <div className="">
                      Quantity :
                      <button
                        onClick={() =>
                          dispatch({
                            type: "DECREMENT_QUANTITY",
                            payload: { id: target.a_id },
                          })
                        }
                        className="px-3 py-1 bg-zinc-200 mx-2 hover:bg-red-600 hover:text-white "
                      >
                        -
                      </button>
                      {target.g_quantity}
                      <button
                        onClick={() =>
                          dispatch({
                            type: "INCREMENT_QUANTITY",
                            payload: { id: target.a_id },
                          })
                        }
                        className="px-3 py-1 bg-zinc-200 mx-2 hover:bg-red-600 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-end ">
                    <span className="bg-gray-500 text-white px-3 py-1">
                      $ {target.h_qunt_price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="flex flex-col gap-3 px-3">
            <div className="flex items-center justify-between px-5">
              <span>Shipping Charge :</span> <span>$ 0</span>
            </div>
            <div className="flex items-center justify-between px-5">
              <span>Goods and Service Tax :</span> <span>$ 0</span>
            </div>
            <div className="flex items-center justify-between pl-5">
              <span>Total Estimation Cost :</span>{" "}
              <span className=" bg-zinc-200 text-red-600 font-[600] px-3 py-1 rounded-md">
                {" "}
                ${" "}
                {myBasket
                  .map((target) => target.h_qunt_price)
                  .reduce((a, b) => {
                    return a + b;
                  }, 0)}
              </span>
            </div>
            {myBasket.length === 0 ? (
              ""
            ) : (
              <div className="flex items-center justify-end">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded-md"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  Pay Now
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="m-5 flex items-center justify-center gap-3 w-fit mx-auto  bg-black text-white px-3 py-1">
          <Link to="/" className="">
            Back to Shop{" "}
          </Link>
          <FaShop />
        </div>
        <div className="bg-red-600 w-full text-white py-3 fixed bottom-0 lg:px-10 md:px-5 px-2 text-center">
          Total Estimation Cost :{" "}
          <span className=" bg-zinc-200 text-zinc-600 px-3 py-1 rounded-md font-[600]">
            {" "}
            ${" "}
            {myBasket
              .map((target) => target.h_qunt_price)
              .reduce((a, b) => {
                return a + b;
              }, 0)}
          </span>
        </div>
        <Profile
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          myBasket={myBasket}
        />

        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default CartPage;
