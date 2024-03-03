import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { IoCartSharp } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import { UserAuth } from "./authentication";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { STORAGE } from "../fbconfig/connect";
import Header from "./Header";

function SingleProduct() {
  const { ProductID } = useParams();
  const { user } = UserAuth();
  const [product, setProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [myBasket, setMyBasket] = useState([]);
  const [loading, SetLoading] = useState(true);
  const navigate = useNavigate();

  const addToCart = async (state, action) => {
    if (action.type === "addTocart") {
      if (user?.email) {
        const selectedProducts = {
          a_id: product.id,
          b_title: product.title,
          c_price: product.price,
          d_productImage: product.category.image,
          e_image: product.images,
          f_description: product.description,
          g_quantity: 1,
          h_qunt_price: product.price,
          i_category: product.category.image,
        };
        const updatedBasket = [...myBasket];
        if (!myBasket.some((target) => target.id === product.id)) {
          updatedBasket.unshift(selectedProducts);
          async function addthis() {
            try {
              await updateDoc(doc(STORAGE, "FashionNova Users", user?.email), {
                e_Cart: updatedBasket,
              });
            } catch (error) {
              console.error("Error adding Product to Cart", error);
            }
          }
          addthis();
        }
      } else {
        alert("Kindly Login Please");
        navigate("/Login");
      }
    } else if (action.type === "removefromcart") {
      const updatedBasket = [...myBasket];
      const RemoveProduct = updatedBasket.filter(
        (target) => target.a_id !== +ProductID
      );
      async function removeit() {
        try {
          await updateDoc(doc(STORAGE, "FashionNova Users", user?.email), {
            e_Cart: RemoveProduct,
          });
        } catch (error) {
          console.error("Error adding Product to Cart", error);
        }
      }
      removeit();
    } else {
      console.log("Invalid action type");
    }
  };

  const [state, dispatch] = useReducer(addToCart, 0);

  useEffect(() => {
    window.scroll(0, 0);
    try {
      const getProducts = async (url) => {
        const req = await fetch(url);
        const res = await req.json();
        setProduct(res);
        SetLoading(false);
      };
      getProducts(`https://api.escuelajs.co/api/v1/products/${ProductID}`);

      const getAllProduct = async (url) => {
        const req = await fetch(url);
        const data = await req.json();
        setAllProduct(data.slice(0, 26));
      };
      getAllProduct("https://api.escuelajs.co/api/v1/products");
    } catch (error) {
      console.error("error happended", error);
    }
  }, [ProductID]);

  useEffect(() => {
    if (user?.email) {
      const subscriber = onSnapshot(
        doc(STORAGE, "FashionNova Users", user?.email),
        (target) => {
          if (target.exists()) {
            setMyBasket(target.data().e_Cart || []);
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
    <div className={``}>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Header />
          <div className=" flex md:flex-nowrap flex-wrap md:gap-5 w-[1200px] mx-auto max-w-[100%] mt-20 md:px-7">
            <div className=" md:w-[30%] w-[100%] mx-auto md:p-0 px-5">
              <div className="">
                <img
                  src={
                    product &&
                    product.images &&
                    product.images[0].slice(
                      product.images[0].indexOf("h"),
                      product.images[0].lastIndexOf("g") + 1
                    )
                  }
                  alt={
                    product &&
                    product.images &&
                    product.images[0].slice(
                      product.images[0].indexOf("h"),
                      product.images[0].lastIndexOf("g") + 1
                    )
                  }
                  className="border md:w-[100%] rounded-md"
                />
              </div>
              <div className=" w-[100%] my-2">
                <div className="w-fit mx-auto grid grid-cols-3 gap-2">
                  {product &&
                    product.images &&
                    product.images.map((target, index) => (
                      <img
                        key={index}
                        src={target.slice(
                          target.indexOf("h"),
                          target.lastIndexOf("g") + 1
                        )}
                        className=" rounded"
                        alt={`pic_` + index + 1}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="md:w-[65%] w-[100%] px-2 my-3">
              <div className="font-[600] lg:text-[30px] sm:text-[20px] text-[16px] md:p-0 px-3">
                {product.title}
              </div>
              <div className=" text-justify my-3 lg:text-[16px] sm:text-[14px] text-[12px] md:p-0 px-3">
                {product.description}
              </div>
              <div className="w-[fit] font-[600] my-2 flex items-center gap-5 md:p-0 px-3">
                <span className="bg-gray-500 px-4 py-1 rounded text-white text-center">
                  Price : ${product.price}
                </span>
                {myBasket.some((target) => target.a_id === +ProductID) ? (
                  <>
                    <button
                      className="px-4 py-1 border-none outline-none rounded-md bg-black text-white text-nowrap flex items-center gap-2"
                      onClick={() => dispatch({ type: "removefromcart" })}
                    >
                      Remove It
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-4 py-1 border-none outline-none rounded-md bg-red-600 text-white text-nowrap flex items-center gap-2"
                      onClick={() => dispatch({ type: "addTocart" })}
                    >
                      Add to Cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-[1200px] mx-auto max-w-[90%] mt-10">
            <div className="px-5 font-[600] text-[20px] my-3">
              Suggesstion Products
            </div>
            <div className="flex items-center gap-5  overflow-x-scroll px-5 c-scroll-bar">
              {allProduct &&
                allProduct.map((target, index) => {
                  if (
                    !(target.id === +ProductID) &&
                    target.category.name === product.category.name
                  ) {
                    return (
                      <Link
                        to={`/FashionNova/Products/${target.id}`}
                        key={index}
                        className="mb-2"
                      >
                        {/* {console.log(target.images[0])} */}
                        <img
                          src={target.images[0]}
                          alt=""
                          width={"150px"}
                          className=" rounded-xl min-w-[150px]"
                        />
                      </Link>
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
            <div className="flex items-center justify-center mt-10">
              <Link
                to="/"
                className=" flex items-center gap-2 rounded-md bg-black hover:-translate-x-5 w-fit px-4 py-1 text-white"
              >
                Back to Shop <FaShop />
              </Link>
            </div>
          </div>
        </>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default SingleProduct;
