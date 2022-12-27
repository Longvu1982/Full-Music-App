import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { changeIconPlay, setCurrnetIndexPlaylist, setLoop, setShuffle } from "../../../redux/features/audioSlice";
import useClickSong from "../../../utils/handleClickSong";
import PlayingLoading from "../../PlayingLoading/PlayingLoading";

const SongControls: React.FC = () => {
	const [isRepeat, setRepeat] = useState<boolean>(false);
	//   const [isShuffle, setShuffle] = useState<boolean>(false);

	const isPlay = useAppSelector((state) => state.audio.isPlay);
	const isLoop = useAppSelector((state) => state.audio.isLoop);
	const isShuffle = useAppSelector((state) => state.audio.isShuffle);
	const playlistSong: any = useAppSelector((state) => state.audio.playlistSong);
	const isSongLoaded: boolean = useAppSelector((state) => state.audio.isSongLoaded);
	const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist);
	const dispatch = useAppDispatch();
	const clickSong = useClickSong();

	const handleRepeat = () => {
		dispatch(setLoop(!isLoop));
		setRepeat(!isRepeat);
	};

	const handleShuffle = () => {
		dispatch(setShuffle(!isShuffle));
	};

	const handlePause = () => {
		if (isPlay) dispatch(changeIconPlay(false));
		else dispatch(changeIconPlay(true));
	};

	const handleNextSong = () => {
		let tempIndex;
		if (currnetIndexPlaylist === playlistSong.length - 1) tempIndex = 0;
		else tempIndex = currnetIndexPlaylist + 1;
		dispatch(setCurrnetIndexPlaylist(tempIndex));
		clickSong(playlistSong?.[tempIndex]?.id, 1, playlistSong, tempIndex, {...playlistSong?.[tempIndex], thumbnailM: playlistSong?.[tempIndex].thumbnail});
	};

	const handlePrevSong = () => {
		let tempIndex;
		if (currnetIndexPlaylist === 0) tempIndex = playlistSong.length - 1;
		else tempIndex = currnetIndexPlaylist - 1;
		dispatch(setCurrnetIndexPlaylist(tempIndex));
		clickSong(playlistSong?.[tempIndex]?.id, 1, playlistSong, tempIndex, {...playlistSong?.[tempIndex], thumbnailM: playlistSong?.[tempIndex].thumbnail});
	};

	return (
		<div className="flex max-w-lg mx-auto xl:w-full items-center justify-between px-2 py-5 child-hover:cursor-pointer child-hover:bg-third child:rounded-full child:flex child:justify-center child:items-center h-[60px] xl:h-[104px]">
			{/* shuffle button */}
			<div onClick={handleShuffle} className="w-10 h-10">
				<FontAwesomeIcon color={isShuffle ? "#1976d2" : ""} icon={faShuffle} className="" />
			</div>

			{/* prev button */}
			<div onClick={handlePrevSong} className="w-10 h-10">
				<FontAwesomeIcon icon={faStepBackward} size="lg" className="" />
			</div>

			{/* play button */}

			{!isSongLoaded ? (
				<div className="w-16 h-16 flex items-center justify-center"><PlayingLoading /></div>
			) : (
				<div onClick={handlePause} className="w-16 h-16">
					<FontAwesomeIcon icon={!isPlay ? faPlay : faPause} size="2xl" className="" />
				</div>
			)}

			{/* next button */}
			<div onClick={handleNextSong} className="w-10 h-10">
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
