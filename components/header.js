import Icon from "@mdi/react";
import { mdiMenu, mdiMagnify } from "@mdi/js";
import Link from "next/link";

function Header(props) {
  return (
    <>
      <div className="w-full left-0 top-0 flex flex-wrap px-10 md:px-10 py-4 h-16 border-b border-primary/10 bg-white/95 fixed z-20 select-none shadow items-center antialiased">
        <div className="w-full flex items-center justify-between">
          <div className="text-2xl sm:text:3xl text-black flex">
            {/* <img className="w-8 h-8" src={Logo} /> */}
            <Link href="/">
              <a className="text-black select-none  hover:text-slate-900 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear">
                University Searcher
              </a>
            </Link>
          </div>
          <div className="md:grid grid-cols-4 gap-5 capitalize hidden">
            <Link href="/">
              <a className="text-black select-none  hover:text-slate-900 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear">
                Home
              </a>
            </Link>
            <Link href="/">
              <a className="text-black select-none  hover:text-slate-900 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear">
                About Us
              </a>
            </Link>
            <Link href="/favourite">
              <a className="text-black select-none  hover:text-slate-900 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear">
                Favourite
              </a>
            </Link>
            {props.email === "" ? (
              <Link href="/register">
                <a className="text-black select-none  hover:text-slate-900 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear">
                  Register/Login
                </a>
              </Link>
            ) : (
              <Link href="/api/logout">
                <a className="text-black select-none  hover:text-slate-900 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear">
                  Logout
                </a>
              </Link>
            )}
          </div>
          <div className="block capitalize md:hidden ">
            <button onClick={props.togglesidebar}>
              <Icon path={mdiMenu} size={1} horizontal vertical />
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          "fixed w-full top-0 bg-white ease-in-out transition-all duration-500 z-50 md:hidden text-black select-none  " +
          (props.sidebar === false ? "h-0 hidden" : "h-screen block")
        }
      >
        <div className="w-full h-16 flex items-center text-2xl sm:text:3xl justify-between px-10 md:px-10 rounded-b-md border-opacity-10  bg-opacity-50 ">
          University Searcher
          <div className="capitalize ">
            <button onClick={props.togglesidebar}>
              <Icon path={mdiMenu} size={1} horizontal vertical />
            </button>
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center ">
          <Link href="/">
            <a
              className="text-black select-none  hover:text-slate-900 text-2xl sm:text:3xl md:text-4xl my-4 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear"
              onClick={props.togglesidebar}
            ></a>
          </Link>
          <Link href="/">
            <a
              className="text-black select-none  hover:text-slate-900 text-2xl sm:text:3xl md:text-4xl my-4 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear"
              onClick={props.togglesidebar}
            >
              About Us
            </a>
          </Link>
          <Link href="/favourite">
            <a
              className="text-black select-none  hover:text-slate-900 text-2xl sm:text:3xl md:text-4xl my-4 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear"
              onClick={props.togglesidebar}
            >
              Favourite
            </a>
          </Link>
          {props.email === "" ? (
            <Link href="/register">
              <a
                className="text-black select-none  hover:text-slate-900 text-2xl sm:text:3xl md:text-4xl my-4 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear"
                onClick={props.togglesidebar}
              >
                Register/Login
              </a>
            </Link>
          ) : (
            <Link href="/api/logout">
              <a
                className="text-black select-none  hover:text-slate-900 text-2xl sm:text:3xl md:text-4xl my-4 hover:scale-125 text-center font-semibold font-comfortaa transition-all duration-300 ease-linear"
                onClick={props.togglesidebar}
              >
                Logout
              </a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
export default Header;
