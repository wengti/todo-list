
import clsx from "clsx"
import type { SetDisplayType } from "./ItemList"
import type { JSX } from "react"
import { useLightModeContext } from "../App"

type Props = {
    setDisplayType: SetDisplayType
}

export default function PlaceholderFilteredEntry({setDisplayType}:Props ): JSX.Element {

    // useLightContext
    const isLightMode = useLightModeContext()

    // ClassName
    const toDoDivClsName = clsx({
        'todo-div': true,
        'smooth-edge-top': true,
        'bottom-border': true,
        'light-todo-div': isLightMode
    })

    return (
        <div className={toDoDivClsName}>
            <button
                className='todo-items-text placeholder-btn'
                onClick={(): void => {setDisplayType('all')}}>
                Reset Filter
            </button>
        </div>
    )
}