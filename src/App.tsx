import React, { useEffect, useState } from "react";
import RouterPage from "./routes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Player from "./components/Player";
import NavBar from "./components/NavBar/NavBar";

const App: React.FC = () => {
	const [isOpen, setOpen] = useState<boolean>(false)
	useEffect(() => {
		setTimeout(() => {
			setOpen(true)
		}, 5000)
	}, [])
	return (
		<Provider store={store}>
			<div className="flex">
				<NavBar />
				<RouterPage />
				<Player />
				{/* {isOpen && <div className="fixed inset-0 bg-red-600"></div>} */}
			</div>
		</Provider>
	);
};

export default App;
