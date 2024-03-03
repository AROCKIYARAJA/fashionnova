import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export const PurchaseItem = ({ content, index }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-[100%] mx-auto cursor-pointer bg-slate-100 rounded-xl my-2 px-5 py-3">
      <div
        className=" font-[600] flex items-center justify-between"
        onClick={() => setShow(!show)}
      >
        <span>
          {index + 1}) &nbsp; {content.b_title}
        </span>
        <span>
          <IoIosArrowDown
            className={`text-[1.5rem] ${show ? " rotate-180" : "rotate-0"} `}
          />
        </span>
      </div>
      <div
        className={` ${
          show ? "h-fit p-5 sm:mx-2 mx-0 bg-white " : "h-0 p-0"
        } transition-all duration-300 overflow-y-auto mt-5 rounded-lg`}
      >
        <div className="mt-2">
          <span className="font-[600] mr-5">Description:</span>{" "}
          {content.f_description}
        </div>
        <div className="mt-2">
          <span className="font-[600]">Price:</span>💲{content.c_price}
        </div>
        <div className="mt-2">
          <span className="font-[600]">Quantity:</span> {content.g_quantity}
        </div>
        <div className="mt-2">
          <span className="font-[600]">Order Time:</span> {content.j_OrderTimes}
        </div>
        <br />
        <Link
          to={`/FashionNova/Products/${content.a_id}`}
          className="flex items-center gap-2"
        >
          View Product <FaExternalLinkAlt />
        </Link>
      </div>
    </div>
  );
};
