// @flow 
import * as React from 'react';

import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';


type Props = {
	addItem:(title: string)=>void


};
export const AddItemForm = ({addItem }: Props) => {
	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)
	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title.trim())
			setTitle('')
		} else {
			setError('Title is required')
		}
	}
	const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}
	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addItemHandler()
		}
	}

const buttonStyle={maxHeight: "20px", minHeight:"20px", maxWidth: "20px",minWidth: "20px"}
	return (
		<div>
			<input
				className={error ? 'error' : ''}
				value={title}
				onChange={changeItemTitleHandler}
				onKeyUp={addTaskOnKeyUpHandler}
			/>
			{/*<Button title={'+'} onClick={addItemHandler}/>*/}
			<Button
				size={"small"}
				// style={buttonStyle}
				variant="contained"
				onClick={addItemHandler}>+</Button>
			{error && <div className={'error-message'}>{error}</div>}
		</div>
	);
};