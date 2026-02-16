import type { Item, SetItems } from "../Layout/Main"
import type { DropZoneEl } from "./ItemList"


type Props = {
    setItems: SetItems
    itemId: number
    dropZoneEl: React.RefObject<DropZoneEl[]>
}

export default function DropZone({ setItems, itemId, dropZoneEl }: Props) {

    function handleDrop(event: React.DragEvent<HTMLDivElement>, isTop: boolean, dropId: number): void {
        event.preventDefault()
        const dragId = Number(event.dataTransfer.getData('text/plain'))

        setItems((prevItems: Item[]): Item[] => {
            /* Create a new instance of prevItems for modificatio */
            const newItems = [...prevItems] 

            /* Find Drag Object from Items */
            const dragObjIdx = newItems.findIndex((item) => item.id === dragId)
            if(dragObjIdx === -1) return prevItems

            /* Remove the object that is being dragged */
            const dragObj = newItems.splice(dragObjIdx, 1)[0] 

            /* Find Drop Zone from Items*/
            const rawDropObjIdx = newItems.findIndex((item) => item.id === dropId)
            if (rawDropObjIdx === -1) return prevItems 
            const dropObjIdx = isTop ? rawDropObjIdx : rawDropObjIdx + 1

            // Add the dragged obejct to its new position relative to the drop zone
            newItems.splice(dropObjIdx, 0, dragObj)

            return newItems // Trigger rerendering
        })
    }

    function addToDropZoneEl(node: HTMLDivElement | null, itemId: number){
        if(node !== null) dropZoneEl.current.push({id: itemId, element: node})
        return (): void => {
            const idx = dropZoneEl.current.findIndex( (item) => item.id === itemId)
            dropZoneEl.current.splice(idx, 1)
        }
    }

    return (
        <div className='dropzone-div' ref={(node)=>{addToDropZoneEl(node, itemId)}}>
            <div
                className='half-dropzone-div'
                onDragOver={(event) => { event.preventDefault() }}
                onDrop={(event) => { handleDrop(event, true, itemId) }}
            >
            </div>
            <div className='half-dropzone-div'
                onDragOver={(event) => { event.preventDefault() }}
                onDrop={(event) => { handleDrop(event, false, itemId) }}
            >
            </div>
        </div>
    )
}