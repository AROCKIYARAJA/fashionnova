import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import bannerImage from "../img/bannerImgOne.png";
import { Link } from "react-router-dom";
import Header from "./Header";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const getProducts = async (url) => {
        const req = await fetch(url);
        const res = await req.json();
        setProducts(res.slice(0, 51));
      };
      getProducts("https://api.escuelajs.co/api/v1/products");
    } catch (error) {
      console.error("error happended", error);
    }
  }, []);
  return (
    <>
      <Header />
      <div className="">
        <img src={bannerImage} alt="" width={"100%"} />
      </div>
      <div className=" text-center font-[700] sm:text-[30px] text-[20px] my-5">
        NEW ARRAIVALS
      </div>
      <div className="w-[1500px] mt-0 mx-auto max-w-[100%] grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-15 md:gap-15 sm:gap-5 gap-3 px-5">
        {products &&
          products.map((target, index) => (
            <div
              key={index}
              className="rounded-lg flex flex-col justify-start rounded-b-2xl relative card md:scale-90 scale-100"
            >
              <div className=" bg-zinc-300 w-fit px-3 py-1 rounded text-[13px] font-[600] absolute top-3 text-orange-600 right-3">
                NEW
              </div>
              <div className="">
                <img
                  src={target.images[0].slice(
                    target.images[0].indexOf("h"),
                    target.images[0].lastIndexOf("g") + 1
                  )}
                  alt={target}
                  width={"100%"}
                  className=" rounded-xl"
                />
              </div>
              <div className="bg-white py-3 border translate-y-[-30px] rounded-b-2xl min-h-[100px] sec-card">
                <div className="font-[600] text-[15px] sm:px-4 px-2 overflow-x-hidden text-nowrap text-ellipsis">
                  {target.title}
                </div>
                <div className="flex items-center justify-between gap-2 mt-1 sm:mx-4 mx-2">
                  <div className=" my-2 sm:px-4 px-2 bg-zinc-200 w-fit rounded">
                    ${target.price}
                  </div>
                  <Link
                    to={`/FashionNova/Products/${target.id}`}
                    className=" flex items-center gap-3 w-[50px] hover:w-fit duration-300 transition-all overflow-hidden"
                  >
                    <span>View</span>{" "}
                    <span className="hide">
                      <FaArrowRightLong />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Products;
