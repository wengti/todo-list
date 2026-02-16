import { createContext, useContext, useRef, useState, type JSX } from 'react'
import { getItemsFromLocalStorage } from '../utilsFunc/localStorage'
import EntryForm from '../EntryForm/EntryForm'
import ItemList from '../ItemList/ItemList'
import Loading from '../Utility/Loading'


// Type
export type Item = {
    id: number
    name: string
    isActive: boolean
}

export type SetItems = React.Dispatch<React.SetStateAction<Item[]>>

// Context
const ItemContext = createContext<[Item[], SetItems]>(null!)
export function useItemsContext(): [Item[], SetItems] {
    return useContext(ItemContext)
}

export default function Main(): JSX.Element {

    // State
    const [items, setItems] = useState<Item[]>(() => { return getItemsFromLocalStorage() }) // initial value should be []
    

    // Ref
    const formEntry = useRef<HTMLInputElement>(null!)

    return (
        <main>
            {
                items ?
                    <ItemContext value={[items, setItems]}>
                        <EntryForm formEntry={formEntry} />
                        <ItemList formEntry={formEntry} />
                        <span className='footer-hint'>Drag and drop to reorder list</span>
                    </ItemContext> :
                    <Loading />
            }
        </main>
    )

}