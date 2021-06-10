import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function SimpleMenu(props) {
	const handleClose = (event) => {
		props.handleClose(event);
	};

	return (
		<div>
			<Menu
				id="simple-menu"
				anchorEl={props.anchor}
				keepMounted
				open={Boolean(props.anchor)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>See cards</MenuItem>
				<MenuItem onClick={handleClose}>Edit</MenuItem>
				<MenuItem
					style={{ color: props.theme.palette.error.light }}
					onClick={handleClose}
				>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
}
