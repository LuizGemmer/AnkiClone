// Implement ipcRenderer in a hook
// Problem it solves:
//       In class based components, when you want to make a call to the main Process,
//     it can be done inside the constructor, ensuring it is only done once every
//     time a component mounts, and not every time the state updates, like in
//     function components. This hook creates a constructor like functionality,
//     preventing a ipc call every state update. (the component does mount twice though)

import { useState } from "react";

const { ipcRenderer } = window.require("electron");

export default function useIpc(wasBuilt) {
	const [shouldCall, setShouldCall] = useState(!wasBuilt);
	const [returnValues, setReturnValues] = useState({});

	// The part that actually solves the problem described above
	const ipcConstructor = (channel, args = {}) => {
		if (shouldCall) {
			const response = ipcRenderer.sendSync(channel, args);
			setShouldCall(false);
			setReturnValues({ [channel]: response });
			return response;
		} else {
			return returnValues[channel];
		}
	};

	const ipcSend = (channel, args = {}) => {
		ipcRenderer.send(channel, args);
	};

	const ipcSendSync = (channel, args = {}) => {
		return ipcRenderer.sendSync(channel, args);
	};

	return { shouldCall, ipcConstructor, ipcSendSync, ipcSend };
}
