import React from "react";

import TopSection from "./TopSection";
import TimeSection from "./TimeSection";
import SongControls from "./SongControls";

const Controls: React.FC = (props) => {
	
	return (
		<div className="pb-6 xl:pt-6 pt-3">
			<TopSection />
			<TimeSection />
			<SongControls />
			<span className="hidden xl:block select-none ">128kbps</span>
		</div>
	);
};

export default Controls;
