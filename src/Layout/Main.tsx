import { useRef, useState, type JSX } from 'react'
import { getItemsFromLocalStorage } from '../utilsFunc/localStorage'
import EntryForm from '../EntryForm/EntryForm'
import ItemList from '../ItemList/ItemList'
import Loading from '../Utility/Loading'

export type Item = {
    id: number
    name: string
    isActive: boolean
}

export type SetItems = React.Dispatch<React.SetStateAction<Item[]>>

export default function Main(): JSX.Element {

    // State
    const [items, setItems] = useState<Item[]>(() => { return getItemsFromLocalStorage() }) // initial value should be []
    

    // Ref
    const formEntry = useRef<HTMLInputElement>(null!)

    return (
        <main>
            {
                items ?
                    <>
                        <EntryForm items={items} setItems={setItems} formEntry={formEntry} />
                        <ItemList formEntry={formEntry} items={items} setItems={setItems} />
                        <span className='footer-hint'>Drag and drop to reorder list</span>
                    </> :
                    <Loading />
            }
        </main>
    )

}