import { Avatar } from "./BlogCard";

export function Appbar() {
    return (
        <div className="flex justify-between px-20 border-b py-4">
            <div className=""><b>SINTU-BLOG</b></div>
            <div className=""><Avatar size={"big"} name="sintu"/></div>
        </div>
    )
}
