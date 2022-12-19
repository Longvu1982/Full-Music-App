import React from "react";
import RouterPage from "./routes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Player from "./components/Player";
import NavBar from "./components/NavBar/NavBar";
import LyricPanel from "./components/LyricPanel/LyricPanel";
import ToastComponent from "./components/ToastComponent/ToastComponent";

const App: React.FC = () => {
	// const songId = useAppSelector(state => state.audio.songId)
	return (
		<Provider store={store}>
			<div className="flex">
				<NavBar />
				<RouterPage />
				<Player />
				<LyricPanel />
				<ToastComponent />
			</div>
		</Provider>
	);
};

export default App;
