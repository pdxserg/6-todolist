import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {MenuButton} from "./MenuButton";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import * as React from "react";

export type Props = {
	changeModeHandler:()=>void
};
export const AppBarHeader = (props: Props) => {
	return (
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
				<MenuButton color="inherit" background={"#47e73c"}>Login</MenuButton>
				<MenuButton color="inherit">Logout</MenuButton>
				<MenuButton color="inherit">New</MenuButton>
				<Switch color={'default'} onChange={props.changeModeHandler} />
			</Toolbar>
		</AppBar>
	);
};


