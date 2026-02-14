import type { JSX } from "react";
import type { FormError } from "./EntryForm";

type Props = {
    formError: FormError
}

export default function ErrorMsg({formError}: Props): JSX.Element | null {

    return (
        formError ?
            <span className='error-msg'>
                {
                    formError instanceof Error ?
                        `${formError.name}: ${formError.message}` :
                        `${formError}`
                }
            </span> :
            null
    )
}