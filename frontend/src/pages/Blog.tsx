import { useParams } from "react-router-dom"
import { useBlog } from "../hooks";
import { FullBlog } from "../component/FullBlog";

export function Blog() {
    const {id}=useParams();
    const {loading,blog}=useBlog({id:id || ""});
    if (loading || !blog) {
        return <div className="">Loading...</div>
    }

    return (
        <>
            <div className=""><FullBlog blog={blog}/></div>
        </>
    )
}
