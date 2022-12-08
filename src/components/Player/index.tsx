import React, { useEffect } from "react";
import { Thumbnail } from "./subPlayer/Thumbnail";
import Controls from "./subPlayer/Index";
import { getSong, getInfoSong } from "../../api/song";
import { useAppDispatch } from "../../hooks/redux";
import { setDuration, setInfoSongPlayer, setSongId, setSrcAudio } from "../../redux/features/audioSlice";
import { getCharthome } from "../../api/zingchart";

const Player: React.FC = () => {

	const dispatch = useAppDispatch();

	// get song details
	useEffect(() => {
		const fetchSong = async () => {
			// get top songs
			const chartHome: any = (await getCharthome())
			const chartHomeNew = chartHome?.newRelease

			// get the first song ID
			const defaultSongId = chartHomeNew[0]?.encodeId

			// get song base on ID
			const song = await getSong(defaultSongId);
			const infoSong = await getInfoSong(defaultSongId);

			// save to redux
			dispatch(setSongId(defaultSongId))
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

			// SetCurrentSong(song, infoSong)
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
