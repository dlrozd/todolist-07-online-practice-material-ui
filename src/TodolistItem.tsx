import type {ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './App'
import {CreateItemForm} from './CreateItemForm'
import {EditableSpan} from './EditableSpan'
import {Box, Button, Checkbox, IconButton, ListItem, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle,
    } = props

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h3>
                <IconButton size={'small'} onClick={deleteTodolistHandler}>
                    <Delete/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <Box sx={{mt: '15px'}}>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <ListItem
                                key={task.id}
                                className={task.isDone ? 'is-done' : ''}
                                disablePadding
                                sx={{display: 'flex', justifyContent: 'space-between'}}
                            >
                                <Box>
                                    <Checkbox
                                        size="small"
                                        checked={task.isDone}
                                        color={'primary'}
                                        onChange={changeTaskStatusHandler}
                                    />
                                    <Typography component='span'>
                                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                    </Typography>

                                </Box>
                                <IconButton size={'small'} onClick={deleteTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </Box>
            )}
            <div>
                <Box sx={{display: 'flex', gap: 1, mt: 1}}>
                    <Button
                        title={'All'}
                        onClick={() => changeFilterHandler('all')}
                        size={'small'}
                        color={filter === 'all' ? 'secondary' : 'primary'}
                        variant={'contained'}>
                        All
                    </Button>
                    <Button
                        title={'Active'}
                        onClick={() => changeFilterHandler('active')}
                        size={'small'}
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        variant={'contained'}>
                        Active
                    </Button>
                    <Button
                        title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}
                        size={'small'}
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        variant={'contained'}>
                        Completed
                    </Button>
                </Box>
            </div>
        </div>
    )
}
