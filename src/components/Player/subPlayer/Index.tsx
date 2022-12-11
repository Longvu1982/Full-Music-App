import React from "react";

import TopSection from "./TopSection";
import TimeSection from "./TimeSection";
import SongControls from "./SongControls";

const Controls: React.FC = (props) => {
	
	return (
		<div className="py-6">
			<TopSection />
			<TimeSection />
			<SongControls />
			<span className="select-none">128kbps</span>
		</div>
	);
};

export default Controls;
