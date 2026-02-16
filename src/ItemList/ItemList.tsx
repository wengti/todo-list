import { useRef, useState } from 'react'
import type { JSX } from 'react'
import ItemEntry from './ItemEntry'
import PlaceholderEntry from './PlaceholderEntry'
import ListFooter from './ListFooter'
import { useItemsContext, type Item } from '../Layout/Main'

/* Type */
type Props = {
    formEntry: React.RefObject<HTMLInputElement>
}

export type DropZoneEl = {
    id: number
    element: HTMLDivElement
}

export type DisplayType = "all" | "completed" | "active"
export type SetDisplayType = React.Dispatch<React.SetStateAction<DisplayType>>


export default function ItemList({ formEntry }: Props): JSX.Element {

    /* State */
    const [displayType, setDisplayType] = useState<DisplayType>("all")

    /* Context */
    const [items, _setItems] = useItemsContext()

    /* Ref */
    const dropZoneEl = useRef<DropZoneEl[]>([])

    /* Function */
    function filterItems(): Item[] {
        if (displayType === 'active') return (items.filter((item) => item.isActive))
        else if (displayType === 'completed') return (items.filter((item) => !item.isActive))
        else return (items)
    }

    /* Elements to be returned */
    return (
        <section className='list-div'>
            {
                items.length > 0 ?
                    <ItemEntry filteredItems={filterItems()} setDisplayType={setDisplayType} dropZoneEl={dropZoneEl}/> :
                    <PlaceholderEntry formEntry={formEntry} />
            }
            <ListFooter displayType={displayType} setDisplayType={setDisplayType}/>
        </section>
    )
}