import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export function FullBlog({blog}:{blog:Blog}) {
    

    return (
        <div className="">
            <Appbar/>
            <div className="flex justify-center">
        <div className="grid grid-cols-12 px-12 w-full pt-7 max-w-screen-2xl">
            <div className=" col-span-8 ">
                <div className="text-3xl font-extrabold">{blog.title}</div>
                 <div className="">{blog.content}</div>
            </div>
            
            <div className=" col-span-4 ">
                <div className="flex items-center gap-2">
                    <Avatar size="big" name={blog.author.name || "chirkut"}/>
                    <div className="text-2xl font-bold">{blog.author.name || "chirkut"}</div>
                    
                </div>
               
            </div>
        </div>
        </div>
        </div>
    )
}
