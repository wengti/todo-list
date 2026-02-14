import { type JSX } from "react";
import { IoSunny } from "react-icons/io5";
import {  saveLightModeToLocalStorage } from "../utilsFunc/localStorage";
import clsx from "clsx";
import type { SetIsLightMode } from "../App";


type Props = {
    isLightMode: boolean
    setIsLightMode: SetIsLightMode
}

export default function Header({isLightMode, setIsLightMode}: Props): JSX.Element {

    // function 
    function toggleLightMode(): void {
        setIsLightMode((prevIsLightMode: boolean): boolean => {
            saveLightModeToLocalStorage(!prevIsLightMode)
            return !prevIsLightMode
        })
    }

    const LightModeBtnClsName = clsx({
        'light-mode-btn': true,
        'light-light-mode-btn': isLightMode
    })

    return (
        <header>
            <h1 className='page-title'>TODO</h1>
            <IoSunny className={LightModeBtnClsName} onClick={() => { toggleLightMode() }} />
        </header>
    )
}