
import type { JSX } from 'react'
import { useActionState } from 'react'
import ErrorMsg from './ErrorMsg'
import { useLightModeContext } from '../App'
import { saveItemsToLocalStorage } from '../utilsFunc/localStorage'
import clsx from 'clsx'
import { useItemsContext, type Item} from '../Layout/Main'

/* type */
type Props = {
    formEntry: React.RefObject<HTMLInputElement>
}

export type FormError = null | Error | String


/* Elements */
export default function EntryForm({ formEntry }: Props): JSX.Element {
    /* Use Context */
    const isLightMode = useLightModeContext()
    const [items, setItems] = useItemsContext()

    /* From Action */
    const [formError, formAction, _isPending] = useActionState<FormError, FormData>(
        (_prevFormError: FormError, formData: FormData): FormError => {
            try {
                const entryName = formData.get('entry')
                if (entryName === null) return "No input can be found. Please try again."

                const newItem: Item = {
                    id: items.length,
                    name: String(entryName), 
                    isActive: true
                }

                setItems((prevItems: Item[]): Item[] => {
                    const newItems: Item[] = [newItem, ...prevItems]
                    saveItemsToLocalStorage(newItems)
                    return newItems
                })
                
                return null
            }
            catch (error) {
                if (error instanceof Error) return error
                else return 'An unknown type of error is caught.'
            }
        },
        null
    )

    /* Class Name */
    const toDoDivClsName = clsx({
        'todo-div': true,
        'smooth-edge-all': true,
        'light-todo-div': isLightMode
    })

    /* Return Component */
    return (
        <section className='form-outer-div'>
            <form className={toDoDivClsName} action={formAction}>
                <button
                    type='button'
                    className='todo-btn'></button>
                <input
                    name='entry'
                    id='entry'
                    type='text'
                    maxLength={100}
                    placeholder='Create a new todo...'
                    className='todo-items-text'
                    ref = {formEntry}
                />
            </form>
            <ErrorMsg formError={formError}/>
        </section>
    )
}


