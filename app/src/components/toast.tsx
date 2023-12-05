import React from "react";
import { toast, TypeOptions } from "react-toastify";

export function toastMsg(msg:string,type:TypeOptions ,id?:string, onclose?:any) {
    toast(msg, {
        type:type,
        toastId: id,
        position: "bottom-center",
        autoClose: type == 'error' || type == 'info'? 8000: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        //theme:'colored',
        //bodyClassName:"opacity-40"
        onClose: onclose,
        bodyClassName: "text-sm"        
        });
}
