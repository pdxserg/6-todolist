import './App.css';
import {Todolist} from "./Todolist";
import * as React from "react";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
	})

	const removeTask = (taskId: string, todolistId: string) => {
		const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
		setTasks(newTodolistTasks)
	}
	const addTodolist = (title: string) => {
		const newId = v1()
		const newTodolist: TodolistType = {id: newId, title: title, filter: 'all'}
		const newTTT = [...todolists, newTodolist]
		setTodolists(newTTT)
		console.log(newTTT)
		setTasks({...tasks, [newId]: []})
	}
	const addTask = (title: string, todolistId: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
		setTasks(newTodolistTasks)
	}


	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
		}
		setTasks(newTodolistTasks)
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		const newTodolists = todolists.map(tl => {
			return tl.id === todolistId ? {...tl, filter} : tl
		})
		setTodolists(newTodolists)
	}


	const removeTodolist = (todolistId: string) => {
		const newTodolists = todolists.filter(tl => tl.id !== todolistId)
		setTodolists(newTodolists)

		delete tasks[todolistId]
		setTasks({...tasks})
	}

	const upDatetask = (todolistID: string, taskId: string, newTitle: string) => {

		setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newTitle} : t)})

	}
	const upDateTodolist = (todolistId: string, title: string) => {
		setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
	}
	return (
		<div className="App">
			<Box sx={{flexGrow: 1, marginBottom: 20}}>
				<AppBar position="fixed">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{mr: 2}}
						>
							<MenuIcon/>
						</IconButton>
						<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
							News
						</Typography>
						<Button color="inherit">Login</Button>
					</Toolbar>
				</AppBar>
			</Box>

			<Container fixed>
				<Grid container spacing={2}>

					<AddItemForm addItem={addTodolist}/>
				</Grid><Grid container spacing={2}>

				{todolists.map((tl) => {

					const allTodolistTasks = tasks[tl.id]
					let tasksForTodolist = allTodolistTasks

					if (tl.filter === 'active') {
						tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
					}

					if (tl.filter === 'completed') {
						tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
					}


					return(
						<Grid item >
							<Todolist
								key={tl.id}
								todolistId={tl.id}
								title={tl.title}
								tasks={tasksForTodolist}
								removeTask={removeTask}
								changeFilter={changeFilter}
								addTask={addTask}
								changeTaskStatus={changeTaskStatus}
								filter={tl.filter}
								removeTodolist={removeTodolist}
								upDatetask={upDatetask}
								upDateTodolist={upDateTodolist}
							/>
						</Grid>
					)
				})}
				</Grid>



			</Container>

		</div>
	);
}

export default App;
