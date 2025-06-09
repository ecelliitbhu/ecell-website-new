import { closeDialog, openDialog } from '@/lib/redux/slices/GlobalDialogWrapperSlice'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import  LogOutIcon  from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
export default function CAAuth({className}) {
    const dispatch = useDispatch()
    const session = useSession()
    const router=useRouter()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    // const [activeTab, setActiveTab] = useState("student");

    const handleClick = (event) => {
        localStorage.setItem("activeTab", "ambassador");
        // setActiveTab("ambassador");
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <FaRegUserCircle 
                onClick={handleClick}
                className={cn("w-8 h-8 max-md:ml-auto max-md:mr-[88px] flex md:items-start cursor-pointer text-orange-500 my-auto", className)}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }} 
            >
                {session.status === "authenticated" ? (
                    <>
                         <MenuItem onClick={() => {
                            handleClose()
                           signOut ({callbackUrl:"/"})
                        }}>
                         <div className="border border-orange-500 rounded-md px-4 py-2 hover:border-orange-600 hover:bg-orange-400 bg-orange-600 text-white">
                        <LogOutIcon fontSize="small" className="mr-2" />
                        Logout
                        </div>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            router.push("/campusambassador")
                            handleClose()
                        }}>
                         <div className="border border-orange-500 rounded-md px-4 py-2 hover:border-orange-600 hover:bg-orange-400 bg-orange-600 text-white">
                        <DashboardIcon fontSize="small" className="mr-2"  /> 
                        CA Dashboard
                        </div>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={() => {
                        dispatch(openDialog({type:'login',title:'Login to Campus Ambassador'}))
                        handleClose()
                    }} 
                   
                    > 
                    <div className="border border-orange-500 rounded-md px-4 py-2 hover:border-orange-600 hover:bg-orange-400 bg-orange-600 text-white">
                            <LoginIcon fontSize="small" className="mr-2" />
                           
                            Login as Campus Ambassador
                        </div>
                        </MenuItem>
                    )}
            </Menu>
        </>
    )
} 