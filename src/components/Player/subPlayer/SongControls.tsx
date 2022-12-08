import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { changeIconPlay, setLoop } from "../../../redux/features/audioSlice";

const SongControls: React.FC = () => {
	const [isRepeat, setRepeat] = useState<boolean>(false);
	const [isShuffle, setShuffle] = useState<boolean>(false);

	const isPlay = useAppSelector((state) => state.audio.isPlay);
	const isLoop = useAppSelector((state) => state.audio.isLoop);
	const dispatch = useAppDispatch();

	const handleRepeat = () => {
		dispatch(setLoop(!isLoop))
		setRepeat(!isRepeat);
	};

	const handleShuffle = () => {
		setShuffle(!isShuffle);
	};

	const handlePause = () => {
		if (isPlay) dispatch(changeIconPlay(false));
		else dispatch(changeIconPlay(true));
	};

	return (
		<div className="flex items-center justify-between px-2 py-5 child-hover:cursor-pointer child-hover:bg-third child:rounded-full child:flex child:justify-center child:items-center">
			{/* shuffle button */}
			<div onClick={handleShuffle} className="w-10 h-10">
				<FontAwesomeIcon color={isShuffle ? "#1976d2" : ""} icon={faShuffle} className="" />
			</div>

			{/* prev button */}
			<div className="w-10 h-10">
				<FontAwesomeIcon icon={faStepBackward} size="lg" className="" />
			</div>

			{/* play button */}
			<div onClick={handlePause} className="w-16 h-16">
				<FontAwesomeIcon icon={!isPlay ? faPlay : faPause} size="2xl" className="" />
			</div>

			{/* next button */}
			<div className="w-10 h-10">
				<FontAwesomeIcon icon={faStepForward} size="lg" className="" />
			</div>

			{/* loop button */}
			<div onClick={handleRepeat} className="w-10 h-10">
				<FontAwesomeIcon color={isLoop ? "#1976d2" : ""} icon={faRepeat} className="" />
			</div>
		</div>
	);
};

export default SongControls;
