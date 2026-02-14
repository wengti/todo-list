import type { Item } from "../App"

export function saveItemsToLocalStorage(items: Item[]): void{
    localStorage.setItem("todoItems", JSON.stringify(items))
}

export function getItemsFromLocalStorage(): Item[] {
    const localStorageVal = localStorage.getItem("todoItems")
    if(!localStorageVal) return []
    return JSON.parse(localStorageVal)
}

export function saveLightModeToLocalStorage(isLightMode: boolean): void{
    localStorage.setItem("isLightMode", JSON.stringify(isLightMode))
}

export function getLightModeFromLocalStorage(): boolean {
    const localStorageVal = localStorage.getItem("isLightMode")
    if(!localStorageVal) return false // Dark Mode by default
    return JSON.parse(localStorageVal)
}