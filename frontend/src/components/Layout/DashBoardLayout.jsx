import { useContext } from "react";
import { UserContext } from "@/context/userConext";
import Navbar from "./Navbar";

const DashBoardLayout = ({children}) => {
    const { user } = useContext(UserContext)
  
    return (
    <div>
        <Navbar/>

        {user && <div>{children}</div>}
    </div>
  )
}

export default DashBoardLayout