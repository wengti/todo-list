import { type JSX } from "react";
import { IoSunny } from "react-icons/io5";
import {  saveLightModeToLocalStorage } from "../utilsFunc/localStorage";
import clsx from "clsx";
import type { SetIsLightMode } from "../App";

/* Type */
type Props = {
    isLightMode: boolean
    setIsLightMode: SetIsLightMode
}

export default function Header({isLightMode, setIsLightMode}: Props): JSX.Element {

    /* Function  */
    function toggleLightMode(): void {
        setIsLightMode((prevIsLightMode: boolean): boolean => {
            saveLightModeToLocalStorage(!prevIsLightMode)
            return !prevIsLightMode
        })
    }

    /* Class Names */
    const LightModeBtnClsName = clsx({
        'light-mode-btn': true,
        'light-light-mode-btn': isLightMode
    })

    /* Returned Elements */
    return (
        <header>
            <h1 className='page-title'>TODO</h1>
            <IoSunny className={LightModeBtnClsName} onClick={() => { toggleLightMode() }} />
        </header>
    )
}