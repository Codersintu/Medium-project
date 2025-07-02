import { Appbar } from "../component/Appbar";
import { BlogCard } from "../component/BlogCard";
import { useBlogs } from "../hooks";

export default function Blogs() {
  const {loading,blogs}=useBlogs();
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="">
        <Appbar/>
    <div className="flex justify-center">
    <div className=" max-w-xl ">
      {blogs.map(b=> <BlogCard title={b.title}
     authorName={b.author.name || "anonymous"} 
     content={b.content} 
     publishedDate={"02 june 2025"}/>
     )}
    
     </div>
     </div>
     </div>
  )
}
