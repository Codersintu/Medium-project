import { Link } from "react-router-dom"

interface BlogCardProps{
     id:number,
    authorName:string,
    content:string,
    publishedDate:string,
    title:string
}
export function BlogCard({authorName,id,title,content,publishedDate}:BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border-b-1 pb-8 border-slate-400">
        <div className="flex items-center gap-2">
           <Avatar size={"small"} name={authorName}/> <div className="font-semibold">{authorName}</div>
           <div className="text-gray-400">{publishedDate}</div> 
        </div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-slate-400">{content.slice(0,100) + "..."}</div>
        <div className="text-sm text-gray-500">{`${Math.ceil(content.length /100)} minutes`}</div>
    </div>
    </Link>
  )
}


export function Avatar({name,size="small"}:{name:string,size:"small"|"big"}){
    return <div className="">   
    <div className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden ${size==="small"?"w-6 h-6":"w-10 h-10"} bg-gray-400 rounded-full dark:bg-gray-600`}>
    <span className={` ${size==="small" ? "text-xs":"text-md"} font-bold text-gray-200 dark:text-gray-300`}>{name[0]}</span>
    </div>
    </div>
}