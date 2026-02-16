
import clsx from "clsx"
import type { JSX } from "react"
import { useLightModeContext } from "../App"

type Props = {
    formEntry: React.RefObject<HTMLInputElement>
}

export default function PlaceholderEntry({ formEntry }: Props): JSX.Element {

    /* Context */
    const isLightMode = useLightModeContext()

    /* ClassName */
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
                onClick={(): void => { formEntry.current.focus() }}>
                Add new items now
            </button>
        </div>
    )
}