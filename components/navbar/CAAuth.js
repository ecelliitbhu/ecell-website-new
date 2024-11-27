import { openDialog } from '@/lib/redux/slices/GlobalDialogWrapperSlice'
import { cn } from '@/lib/utils'
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

export default function CAAuth({className}) {
    const dispatch=useDispatch()
  return (
    <FaRegUserCircle onClick={()=>dispatch(openDialog('login'))} className={cn("w-8 h-8 max-md:ml-auto max-md:mr-[88px]  flex md:items-start cursor-pointer text-orange-500 my-auto",className)}/>
  )
}
