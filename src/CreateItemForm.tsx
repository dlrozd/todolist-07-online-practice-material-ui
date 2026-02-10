import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import {Add} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                className={error ? 'error' : ''}
                value={title}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}/>
            <IconButton onClick={createItemHandler}>
                <Add/>
            </IconButton>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}