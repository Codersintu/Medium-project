import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export function Appbar() {
    return (
        <div className="flex justify-between px-20 border-b py-4">
           <Link to={'/blogs'}>
            <div className=""><b>SINTU-BLOG</b></div>
              </Link>
            <div className="flex">
                <Link to={'/publish'}>
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4 cursor-pointer  ">New +</button>
                </Link>
                <Avatar size={"big"} name="sintu"/>
                </div>
        </div>
    )
}
