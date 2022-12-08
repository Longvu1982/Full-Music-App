import React, { useEffect } from "react";
import { Thumbnail } from "./subPlayer/Thumbnail";
import Controls from "./subPlayer/Index";
import { getSong, getInfoSong } from "../../api/song";
import { useAppDispatch } from "../../hooks/redux";
import { setDuration, setInfoSongPlayer, setSrcAudio } from "../../redux/features/audioSlice";

const Player: React.FC = () => {

	const dispatch = useAppDispatch();

	// get song details
	useEffect(() => {
		const fetchSong = async () => {
			const song = await getSong("Z6WZ0CZE");
			const infoSong = await getInfoSong("Z6WZ0CZE");
			// console.log("infoSong :", infoSong);

			// save to redux
			dispatch(setSrcAudio(song[128]));
			dispatch(
				setInfoSongPlayer({
					title: infoSong.title,
					thumbnail: infoSong.thumbnailM,
					artistsNames: infoSong.artistsNames,
					artists: infoSong.artists,
				})
			);
			dispatch(setDuration(infoSong.duration))
		};
		fetchSong();
	}, [dispatch]);

	return (
		<div className=" fixed top-0 right-0 flex flex-col justify-between text-center float-right text-light_title_color w-80 h-screen bg-secondary border-l-[0.5px] border-l-border_color px-4">
			<Thumbnail />
			<Controls />
		</div>
	);
};

export default Player;
