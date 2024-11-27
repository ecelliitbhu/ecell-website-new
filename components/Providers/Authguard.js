"use client"
// import { useSession } from "next-auth/react";
import { openDialog } from "@/lib/redux/slices/GlobalDialogWrapperSlice";
import { usePathname } from "next/dist/client/components/navigation";
import {useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


const AuthGuard = ({ children }) => {
  // const { data: session, status } = useSession();
  const dispatch=useDispatch()
  const router = useRouter();
  
  // Define an array of protected routes
  const protectedRoutes = ["/campusambassador", "/profile"]; // Add more protected routes as needed

  // if (status === "loading") {
  //   return <div>Loading...</div>; 
  // }

  // Check if the current route is protected and if the user is authenticated

  if (protectedRoutes.includes(usePathname())) {
    // If not authenticated, redirect to sign-in page
    // dispatch(openDialog('login'))
    // return null; // Prevent rendering the protected content
  }

  // if(!(session?.user?.formFilled)){
  //   dispatch(openDialog("login"))
  // }

  // If the user is authenticated or the route is not protected, render the content
  return <>{children}</>;
};

export default AuthGuard;
