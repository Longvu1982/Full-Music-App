import React, { useEffect } from "react";
import { Thumbnail } from "./subPlayer/Thumbnail";
import Controls from "./subPlayer/Index";
import { getSong } from "../../api/song";
import { useAppDispatch } from "../../hooks/redux";
import { useSetCurrentSong } from "../../utils/SetCurrentSong";
import { getHomePlayList } from "../../api/home";
import { getDetailPlaylist } from "../../api/detailPlaylist";
import { setCurrnetIndexPlaylist, setPlaylistSong, setSongId } from "../../redux/features/audioSlice";

const Player: React.FC = () => {
	const dispatch = useAppDispatch();
	const setCurrentSong = useSetCurrentSong();

	// get song details
	useEffect(() => {
		const fetchSong = async () => {
			// get today songs
			const gethomeDetails: any = await getHomePlayList();
			const todayPlaylistId = gethomeDetails?.[0].items?.[0].encodeId;

			// fetch today playlist
			const todayPlaylist = await getDetailPlaylist(todayPlaylistId);

			// get random song in playlist
			// const todayPlaylistTotal = todayPlaylist?.song?.total;
			// const randomIndex = Math.floor(Math.random() * todayPlaylistTotal);
			dispatch(setCurrnetIndexPlaylist(0));

			// get the random song ID
			const todaySongLists = todayPlaylist?.song?.items;
			// let randomSongId: string = "";
			// let song: any;
			// let infoSong: any;
			// do {
			const randomSongId = todaySongLists?.[0]?.encodeId;
			const song = await getSong(randomSongId);
			// const infoSong = await getInfoSong(randomSongId);
			// } while (infoSong?.streamingStatus === 2);
			dispatch(setSongId(randomSongId));

			// get song base on ID

			// save to redux
			setCurrentSong(song, todaySongLists?.[0], randomSongId);
			dispatch(
				setPlaylistSong(
					todaySongLists?.map((item: any) => {
						return {
							id: item?.encodeId,
							status: item?.streamingStatus,
							title: item?.title,
							thumbnail: item?.thumbnailM,
							artists: item?.artistsNames,
							duration: item?.duration,
							artistsNames: item?.artistsNames
						};
					})
				)
			);
		};
		fetchSong();
	}, [dispatch, setCurrentSong]);

	return (
		<div className="fixed shadow-normal xl:top-0 right-0 bottom-0 flex flex-col justify-between text-center text-light_title_color w-full xl:w-80 h-auto xl:h-screen bg-secondary border-l-[0.5px] border-l-border_color px-4">
			<div className="hidden xl:block"><Thumbnail /></div>
			<Controls />
		</div>
	);
};

export default React.memo(Player);
