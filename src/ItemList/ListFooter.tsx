import type { JSX } from 'react'
import { useLightModeContext } from '../App'
import { saveItemsToLocalStorage } from '../utilsFunc/localStorage'
import type { DisplayType, SetDisplayType } from './ItemList'
import clsx from 'clsx'
import { useItemsContext, type Item } from '../Layout/Main'

/* Type */
type Props = {
    displayType: DisplayType
    setDisplayType: SetDisplayType
}


export default function ListFooter({ displayType, setDisplayType }: Props): JSX.Element {

    /* Context */
    const isLightMode = useLightModeContext()
    const [items, setItems] = useItemsContext()

    /* Derived state */
    const numActiveItems: number = items.filter((item: Item): boolean => item.isActive).length

    /* Function */
    function handleClearCompleted(): void {
        setItems((prevItems: Item[]): Item[] => {
            const newItems = prevItems.filter((item: Item): boolean => item.isActive)
            saveItemsToLocalStorage(newItems)
            return newItems
        })
    }

    /* Derived elements */
    const availableDisplayType: DisplayType[] = ['all', 'completed', 'active']
    const displayPanel: JSX.Element[] = availableDisplayType.map((typeStr: DisplayType): JSX.Element => {

        /* Class Names */
        const displayPanelCls = clsx({
            'display-panel': true,
            'active-display-type': displayType === typeStr,
        })

        return (
            <div
                key={typeStr}
                onClick={() => { setDisplayType(typeStr) }}
                className={displayPanelCls}
            >
                {typeStr[0].toUpperCase() + typeStr.slice(1)}
            </div>
        )
    })

    /* Returned Element */

    /* ClassName */
    const toDoDivClsName = clsx({
        'todo-div': true,
        'smooth-edge-bottom': true,
        'list-footer': true,
        'light-todo-div': isLightMode
    })

    const mobileToDoDivClsName = clsx({
        'mobile-display-panel': true,
        'todo-div': true,
        'smooth-edge-all': true,
        'list-footer': true,
        'light-todo-div': isLightMode
    })

    return (
        <>
            <div className={toDoDivClsName}>
                <div className='side-panel'>
                    {numActiveItems} items left
                </div>
                <div className='display-panel-div'>
                    {displayPanel}
                </div>
                <div className="clear-btn side-panel" onClick={() => { handleClearCompleted() }}>
                    Clear Completed
                </div>
            </div>
            <div className={mobileToDoDivClsName}>
                <div className='mobile-display-panel-div'>
                    {displayPanel}
                </div>
            </div>
        </>

    )
}