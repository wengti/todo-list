import { type JSX } from "react";
import { IoSunny } from "react-icons/io5";
import {  saveLightModeToLocalStorage } from "../utilsFunc/localStorage";
import type { SetIsLightMode } from "../App";

/* Type */
type Props = {
    setIsLightMode: SetIsLightMode
}

export default function Header({setIsLightMode}: Props): JSX.Element {

    /* Function  */
    function toggleLightMode(): void {
        setIsLightMode((prevIsLightMode: boolean): boolean => {
            saveLightModeToLocalStorage(!prevIsLightMode)
            return !prevIsLightMode
        })
    }

    /* Returned Elements */
    return (
        <header>
            <h1 className='page-title'>TODO</h1>
            <IoSunny className='light-mode-btn' onClick={() => { toggleLightMode() }} />
        </header>
    )
}