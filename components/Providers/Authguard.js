"use client"
// import { useSession } from "next-auth/react";
import { openDialog } from "@/lib/redux/slices/GlobalDialogWrapperSlice";
import { useSession } from "next-auth/react";
import { usePathname } from "next/dist/client/components/navigation";
import {useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


const AuthGuard = ({ children }) => {
  // const { data: session, status } = useSession();
  const dispatch=useDispatch()
  const router = useRouter();
  const session=useSession()
  
  // Define an array of protected routes
  const protectedRoutes = ["/campusambassador", "/profile"]; // Add more protected routes as needed

  if (session.status === "loading") {
    return <div>{children}</div>; 
  }

  // Check if the current route is protected and if the user is authenticated

  if (protectedRoutes.includes(usePathname())) {
    if(session.status!="authenticated"){
    dispatch(openDialog({type:'login',title:"Proceed to Login"}))
    return null;
    }
     // Prevent rendering the protected content
  }

  // if(!(session?.user?.formFilled)){
  //   dispatch(openDialog("login"))
  // }

  // If the user is authenticated or the route is not protected, render the content
  return <>{children}</>;
};

export default AuthGuard;
