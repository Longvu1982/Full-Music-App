import React from "react";
import { Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import HomePage from "../pages/HomePage";
import PlayListPage from "../pages/PlayListPage";

const RouterPage: React.FC = () => {
	return (
		<div className="ml-16 mr-80 w-full p-8">
			<div className="h-12 w-96 bg-third mb-10 rounded-sm overflow-hidden gap-2 flex items-center py-1 px-4">
				<FontAwesomeIcon className="text-light_title_color" icon={faSearch} />
				<input placeholder="Nhập từ khoá tìm kiếm" className="outline-none w-full h-full bg-transparent text-light_title_color px-1" type="text" />
			</div>
			<Routes>
				<Route index element={<HomePage />}></Route>
				<Route path="/home" element={<HomePage />}></Route>
				<Route path="/playlist/:playListId" element={<PlayListPage />}></Route>
			</Routes>
		</div>
	);
};

export default RouterPage;
