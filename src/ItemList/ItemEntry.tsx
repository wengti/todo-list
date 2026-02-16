
import { useLightModeContext } from "../App"
import type { JSX } from "react"
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { clsx } from 'clsx';
import { saveItemsToLocalStorage } from "../utilsFunc/localStorage";
import PlaceholderFilteredEntry from "./PlaceholderFilteredEntry";
import type { SetDisplayType } from "./ItemList";
import type { Item, SetItems } from "../Layout/Main";

type Props = {
    filteredItems: Item[]
    setItems: SetItems
    setDisplayType: SetDisplayType
}

export default function ItemEntry({ filteredItems, setItems, setDisplayType }: Props): JSX.Element[] {

    // Key Note:
    // When destructuring [...ArrayOfObjects] 
    // => This may have created a new array, but the objects still point to the same objects
    function toggleItemStatus(itemId: number): undefined {
        setItems((prevItems: Item[]): Item[] => {
            const newItems: Item[] = prevItems.map((prevItem: Item): Item => {
                if (prevItem.id === itemId) {
                    return { ...prevItem, isActive: !prevItem.isActive }
                }
                return { ...prevItem }
            })
            saveItemsToLocalStorage(newItems)
            return newItems
        })
    }

    function handleCross(itemId: number): undefined {
        setItems((prevItems: Item[]): Item[] => {
            const selectedItemIdx: number = prevItems.findIndex((item: Item): boolean => item.id === itemId)
            if (selectedItemIdx === -1) return prevItems
            const newItems = [...prevItems]
            newItems.splice(selectedItemIdx, 1)

            saveItemsToLocalStorage(newItems)
            return newItems
        })
    }

    // Light Context
    const isLightMode = useLightModeContext()

    // Return elements via mapping
    if (filteredItems.length > 0) {
        return filteredItems.map((item: Item, idx: number): JSX.Element => {

            // Class Name
            const todoDivClsName = clsx({
                'todo-div': true,
                'bottom-border': true,
                'smooth-edge-top': idx === 0,
                'light-todo-div': isLightMode
            })

            const todoBtnClsName = clsx({
                'todo-btn': true,
                'no-shrink': true,
                'colorful': !item.isActive
            })

            const toDoItemsClsName = clsx({
                'todo-items-text': true,
                'strikethrough': !item.isActive
            })

            return (
                <div key={item.id}>
                    <div className={todoDivClsName} >
                        <button
                            type='button'
                            className={todoBtnClsName}
                            onClick={(): void => { toggleItemStatus(item.id) }}
                        >
                            {!item.isActive && <FaCheck className='tick' />}
                        </button>
                        <span className={toDoItemsClsName}>{item.name}</span>
                        <RxCross1
                            className='cross-btn no-shrink'
                            onClick={() => handleCross(item.id)}
                        />
                    </div>
                </div>
            )
        })
    }
    else {
        return [<PlaceholderFilteredEntry setDisplayType={setDisplayType} />]
    }

}


