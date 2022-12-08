import React from "react";
import RouterPage from "./routes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Player from "./components/Player";
import NavBar from "./components/NavBar/NavBar";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<div className="flex">
				<NavBar />
				<RouterPage />
				<Player />
			</div>
		</Provider>
	);
};

export default App;
