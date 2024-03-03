import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import paymentAudio from "../music/tune.mp3";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <div>
      <audio src={paymentAudio} autoPlay></audio>
      <div className="w-fit mx-auto mt-16">
        <span className="font-[200] text-[25px]">FASHION</span>
        <span className="font-[700] text-[25px] px-1 border-2 rounded-md">
          NOVA
        </span>
      </div>
      <img
        src="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif"
        alt=""
        className="w-[550px] max-w-[100%] mx-auto"
      />
      <p className="text-center">
        <Link
          to="/"
          className=" w-fit px-5 py-2 rounded-md bg-black text-white"
        >
          Back to Home
        </Link>
      </p>
    </div>
  );
}

export default PaymentSuccess;
