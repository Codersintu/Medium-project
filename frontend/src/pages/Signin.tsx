import { Auth } from "../component/Auth";
import { Quote } from "../component/Quote";

export function Signin() {
    

    return (
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className=""><Auth type="signin"/></div>
            <div className=""><Quote/></div>
          </div>
           
        </div>
    )
}
