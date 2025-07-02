import { Appbar } from "../component/Appbar";
import { BlogCard } from "../component/BlogCard";
import { Skelton } from "../component/Skelton";
import { useBlogs } from "../hooks";


export default function Blogs() {
  const {loading,blogs}=useBlogs();
  if (loading) {
    return <div className="">
      <Appbar/>
    <div className="flex flex-col items-center ">
      <Skelton/>
    <Skelton/>
    <Skelton/>
    <Skelton/>
    <Skelton/>
    </div>
    </div>
  }
  return (
    <div className="">
        <Appbar/>
    <div className="flex justify-center">
    <div className=" max-w-xl ">
      {blogs.map(b=> <BlogCard id={b.id} title={b.title}
     authorName={b.author.name || "anonymous"} 
     content={b.content} 
     publishedDate={"02 june 2025"}/>
     )}
    
     </div>
     </div>
     </div>
  )
}
