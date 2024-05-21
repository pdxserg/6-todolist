import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import {AddItemForm} from "./AddItemForm";
import {EdittableSpan} from "./Edittable Span";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {SxProps} from "@mui/material";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";


type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	upDatetask: (todolistID: string, taskId: string, newTitle: string) => void
	upDateTodolist: (todolistId: string, title: string) => void

}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		todolistId,
		removeTodolist,
		upDatetask,
		upDateTodolist
	} = props


	const addTaskHandler = (title: string) => {
		addTask(title, todolistId)
	}

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}
	const upDateTodolisthandler = (newTitle: string) => {
		upDateTodolist(todolistId, newTitle)
	}
	const upDatetaskhandler = (id: string, newTitle: string) => {
		upDatetask(todolistId, id, newTitle)
	}
	return (
		<div>
			<div className={"todolist-title-container"}>
				{/*//<h3>{title}</h3>*/}
				<h3>
					<EdittableSpan addNewTitle={upDateTodolisthandler}
					               oldTytle={title} onchange={(newValue: string) => {
					}}/>
				</h3>
				{/*<Button title={'x'} onClick={removeTodolistHandler}/>*/}
				<IconButton aria-label="delete" onClick={removeTodolistHandler}>
					<DeleteIcon/>
				</IconButton>
			</div>
			<div>
				<AddItemForm addItem={addTaskHandler}/>

			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}
							// const upDatetaskhandler = (newTitle: string) => {
							// 	upDatetask(todolistId, task.id, newTitle)
							// }

							return <ListItem key={task.id}
							                 sx={getListItemSx(task.isDone)}
							>
								<div>
									<Checkbox defaultChecked color="success"
									          checked={task.isDone} onChange={changeTaskStatusHandler}
									/>

									<EdittableSpan addNewTitle={(newTitle) => upDatetaskhandler(task.id, newTitle)}
									               oldTytle={task.title} onchange={(newValue: string) => {
									}}/>
								</div>

								{/*<Button onClick={removeTaskHandler} title={'x'}/>*/}
								<IconButton aria-label="delete" onClick={removeTaskHandler}>
									<DeleteIcon/>
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button onClick={() => changeFilterTasksHandler('all')}
				        variant={filter === 'all' ? 'outlined' : 'contained'}>
					All</Button>
				<Button onClick={() => changeFilterTasksHandler('active')}
				        variant={filter === 'active' ? 'outlined' : 'contained'}>
					Active</Button>
				<Button onClick={() => changeFilterTasksHandler('completed')}
				        variant={filter === 'completed' ? 'outlined' : 'contained'}>
					Comp</Button>

				{/*<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}*/}
				{/*        onClick={() => changeFilterTasksHandler('all')}/>*/}
				{/*<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}*/}
				{/*        onClick={() => changeFilterTasksHandler('active')}/>*/}
				{/*<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}*/}
				{/*        onClick={() => changeFilterTasksHandler('completed')}/>*/}
			</Box>
		</div>
	)
}
