// @flow 
import * as React from 'react';
import {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type Props = {
	oldTytle: string
	onchange: (newValue: string) => void
	addNewTitle: (newTitle: string) => void
};
export const EdittableSpan = ({oldTytle, addNewTitle}: Props) => {
	const [editMode, setEditMode] = useState(false)
	const [newTitle, setNewTitle] = useState(oldTytle)
	const editHandler = () => {
		setEditMode(!editMode)
		if (editMode) {
			addNewTitle(newTitle)
		}

	}
	const onchangehandler = (el: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(el.currentTarget.value)

	}
	return (
		editMode
			?
			<TextField
				type="text" value={newTitle}
				onChange={onchangehandler}
				onBlur={editHandler}
				autoFocus
				id="outlined-basic"
				label="Text"
				variant="outlined"/>


			// <input type="text" value={newTitle}
			//          onChange={onchangehandler}
			//          onBlur={ editHandler}
			//          autoFocus
			// />
			: <span onDoubleClick={editHandler}


			>{oldTytle}</span>

	)
		;
};