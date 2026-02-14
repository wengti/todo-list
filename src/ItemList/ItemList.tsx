import { useState } from 'react'
import type { JSX } from 'react'
import type { Item, SetItems } from '../App'
import ItemEntry from './ItemEntry'
import PlaceholderEntry from './PlaceholderEntry'
import ListFooter from './ListFooter'

type Props = {
    items: Item[]
    formEntry: React.RefObject<HTMLInputElement>
    setItems: SetItems
}

export type DisplayType = "all" | "completed" | "active"
export type SetDisplayType = React.Dispatch<React.SetStateAction<DisplayType>>


export default function ItemList({ items, setItems, formEntry }: Props): JSX.Element {

    const [displayType, setDisplayType] = useState<DisplayType>("all")

    function filterItems(): Item[] {
        if (displayType === 'active') return (items.filter((item) => item.isActive))
        else if (displayType === 'completed') return (items.filter((item) => !item.isActive))
        else return (items)
    }

    return (
        <section className='list-div'>
            {
                items.length > 0 ?
                    <ItemEntry filteredItems={filterItems()} setItems={setItems} setDisplayType={setDisplayType}/> :
                    <PlaceholderEntry formEntry={formEntry} />
            }
            <ListFooter
                items={items}
                setItems={setItems}
                displayType={displayType}
                setDisplayType={setDisplayType}
            />
        </section>
    )
}