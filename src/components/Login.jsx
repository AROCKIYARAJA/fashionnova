import React, { useState } from "react";
import { UserAuth } from "./authentication";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { signInWithPopup } from "firebase/auth";
import { AUTH, GoogleAccount } from "../fbconfig/connect";
import { FaUserAlt } from "react-icons/fa";

function Login() {
  const { LoginAccount, CreateAccountWithGoogle, CreateAccount } = UserAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNO, setPhoneNo] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lemail, setLEmail] = useState("");
  const [lpassword, setLPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [sbtnLoading, setSBtnLoading] = useState(false);
  const [loginControl, setLoginControl] = useState(false);
  const [signupControl, setSignUpControl] = useState(false);

  const handleSubmit = async () => {
    setBtnLoading(true);
    try {
      await LoginAccount(lemail, lpassword);
      navigate("/");
    } catch (error) {
      alert("error");
    }
    setBtnLoading(false);
  };
  const AccountCreating = async () => {
    setSBtnLoading(true);

    try {
      await CreateAccount(name, email, password, phoneNO);
      alert("User Account Created Successfully");
      navigate("/");
    } catch (error) {
      console.error("Oops! Something is wrong 😞 \n", error);
      alert(" failed to create! ");
    }
    setSBtnLoading(false);
  };

  const googleAccountCreate = async () => {
    try {
      const target = await signInWithPopup(AUTH, GoogleAccount);
      await CreateAccountWithGoogle(
        target.user.email,
        target.user.displayName,
        target.user.phoneNumber
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during Google account creation.");
    }
  };

  return (
    <div className=" w-screen h-screen relative overflow-hidden c-color">
      <div className="md:pt-20 pt-14">
        <Link to='/' className="flex items-center justify-center gap-2">
          <span className=" font-[200] text-[20px]">FASHION</span>
          <span className="font-[700] text-[20px] px-2 py-0 border-2 rounded-md">
            NOVA
          </span>
        </Link>
        <div className="w-[400px] mx-auto max-w-[90%] text-center text-[15px] mt-5">
          <span className="">
            Style is a way to say who you are without having to speak.
          </span>{" "}
          <span className="font-[600]">— Rachel Zoe</span>
        </div>
        <div className="flex items-center justify-center gap-3 mt-24">
          <button
            onClick={() => setLoginControl(!loginControl)}
            className="bg-red-600 text-white px-5 py-1 rounded"
          >
            LogIn
          </button>
          <button
            onClick={() => setSignUpControl(!signupControl)}
            className="bg-black text-white px-5 py-1 rounded"
          >
            SignUp
          </button>
        </div>
      </div>
      <div
        className={` h-[70vh] w-[99%] left-2/4 -translate-x-2/4 bg-slate-300 rounded-tl-3xl rounded-tr-3xl absolute  shadow-inner ${
          loginControl ? "bottom-[0]" : "bottom-[-70vh]"
        }`}
      >
        <div className="sm:w-[200px] w-[100px] h-[5px] rounded-full bg-black mt-5 mx-auto"></div>
        <div className="flex items-center justify-end  translate-x-[-20px] -translate-y-2">
          <button
            onClick={() => setLoginControl(!loginControl)}
            className="p-2 rounded-full bg-slate-400 text-red-600"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="">
          <form
            action=""
            className="flex flex-col items-center justify-center gap-3"
          >
            <input
              value={lemail}
              onChange={(e) => setLEmail(e.target.value)}
              type="email"
              className="border border-gray-400 px-3 py-1 rounded-md"
              placeholder="Email"
              onDoubleClick={() => setLEmail("admin@gmail.com")}
            />
            <input
              value={lpassword}
              onChange={(e) => setLPassword(e.target.value)}
              onDoubleClick={() => setLPassword("fnadmin")}
              type="password"
              className="border border-gray-400 px-3 py-1 rounded-md"
              placeholder="Password"
            />
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-1 rounded-md "
              onClick={() => handleSubmit()}
            >
              {btnLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <AiOutlineLoading3Quarters className="spinner" />
                  Getting Account...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="flex flex-col items-center justify-center mt-5 gap-4">
            <button
              onClick={() => googleAccountCreate()}
              className="flex items-center justify-center gap-3 bg-white px-3 py-1 rounded-md"
            >
              {" "}
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                className="w-[30px]"
                alt=""
              />{" "}
              Login With Google
            </button>
            <button
              className="flex items-center justify-center gap-3 bg-white px-3 py-[6px] rounded-md"
              onClick={() => {
                setLEmail("guestmode@gmail.com");
                setLPassword("guestmode");
              }}
            >
              <FaUserAlt /> Guest Mode
            </button>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------- */}
      <div
        className={` h-[70vh] w-[99%] left-2/4 -translate-x-2/4 bg-slate-300 rounded-tl-3xl rounded-tr-3xl  absolute  shadow-inner ${
          signupControl ? "bottom-[0]" : "bottom-[-70vh]"
        }`}
      >
        <div className="sm:w-[200px] w-[100px] h-[5px] rounded-full bg-black mt-5 mx-auto"></div>
        <div className="flex items-center justify-end  translate-x-[-20px] -translate-y-2">
          <button
            onClick={() => setSignUpControl(!signupControl)}
            className="p-2 rounded-full bg-slate-400 text-red-600"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="">
          <form
            action=""
            className="flex flex-col items-center justify-center gap-3"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="border border-gray-400 px-3 py-1 rounded-md"
              placeholder="Name"
            />
            <input
              value={phoneNO}
              onChange={(e) => setPhoneNo(e.target.value)}
              type="tel"
              className="border border-gray-400 px-3 py-1 rounded-md"
              placeholder="Contact Number"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border border-gray-400 px-3 py-1 rounded-md"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border border-gray-400 px-3 py-1 rounded-md"
              placeholder="Password"
            />
            <button
              onClick={() => AccountCreating()}
              type="button"
              className="bg-red-600 text-white px-4 py-1 rounded-md "
            >
              {sbtnLoading ? "Account Creating..." : "Create Account"}
            </button>
          </form>
          <div className="flex items-center justify-center mt-5">
            <button
              onClick={() => googleAccountCreate()}
              className="flex items-center justify-center gap-3 bg-white px-3 py-1 rounded-md"
            >
              {" "}
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                className="w-[30px]"
                alt=""
              />{" "}
              SignUp With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
