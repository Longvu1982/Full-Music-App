import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PlayListPage from "../pages/PlayListPage";
import SearchPage from "../pages/SearchPage";
import SearchBar from "../components/SearchBar/SearchBar";
import VideoPage from "../pages/VideoPage";

const RouterPage: React.FC = () => {
	return (
		<div className="ml-16 mr-0 xl:mr-80 overflow-x-hidden w-full px-2 md:px-8 py-8">
			<SearchBar />
			<Routes>
				<Route index element={<HomePage />}></Route>
				<Route path="/home" element={<HomePage />}></Route>
				<Route path="/:keyword" element={<SearchPage />}></Route>
				<Route path="/video/:videoId" element={<VideoPage />}></Route>
				<Route path="/playlist/:playListId" element={<PlayListPage />}></Route>
			</Routes>
		</div>
	);
};

export default RouterPage;
