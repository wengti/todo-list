
import { useState, createContext, useContext } from 'react'
import type { JSX } from 'react'

import { getLightModeFromLocalStorage} from './utilsFunc/localStorage'

import clsx from 'clsx'
import Main from './Layout/Main';
import Header from './Layout/Header';


// type
export type SetIsLightMode = React.Dispatch<React.SetStateAction<boolean>>

// Context
const LightModeContext = createContext<boolean>(false)
export function useLightModeContext(): boolean {
    return useContext<boolean>(LightModeContext)
}

// Component
export default function App(): JSX.Element {

    // State
    const [isLightMode, setIsLightMode] = useState<boolean>(() => { return getLightModeFromLocalStorage() })

    //  ClassName
    const ContentBodyClsName = clsx({
        'content-body': true,
        'light-content-body': isLightMode
    })

    return (
        <LightModeContext value={isLightMode}>
            <div className={ContentBodyClsName}>
                <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode}/>
                <Main />
                <div className='banner-img-container'>
                </div>
            </div>
        </LightModeContext>
    )
}
