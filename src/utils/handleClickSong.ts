import { getSong } from "../api/song";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
	changeIconPlay,
	setCurrnetIndexPlaylist,
	setOpenToast,
	setPlaylistSong,
	setSongId,
	setSongLoaded,
	setWarningMsg,
} from "../redux/features/audioSlice";
import { useSetCurrentSong } from "./SetCurrentSong";

const useClickSong = () => {
	const dispatch = useAppDispatch();
	const songId = useAppSelector((state) => state.audio.songId);
	const setCurrentSong = useSetCurrentSong();
	return async (encodeId: string, streamingStatus: number, songIdList: any, playingIndex: number, infoSong?: any) => {
		console.log(infoSong);
		if (songIdList && songIdList.length > 0) dispatch(setPlaylistSong(songIdList));
		if (streamingStatus === 2) {
			dispatch(setOpenToast(true));
			dispatch(setWarningMsg("Bài hát chỉ dành cho tài khoản VIP !"));
			return;
		} else {
			if (encodeId !== songId) {
				dispatch(setSongLoaded(false));

				const song = await getSong(encodeId);
				console.log("song", song);
				console.log(encodeId);
				if (song?.err !== 0) {
					// alert(song?.msg)
					dispatch(setSongLoaded(true));
					dispatch(setOpenToast(true));
					dispatch(setWarningMsg(song?.msg));
					return;
				} else dispatch(setSongId(encodeId));
				// const infoSong = await getInfoSong(encodeId);
				// let infoSong
				console.log("infoSong", infoSong);
				setCurrentSong(song, infoSong, encodeId);
				dispatch(changeIconPlay(true));
				dispatch(setCurrnetIndexPlaylist(playingIndex));
			}
		}
	};
};

export default useClickSong;
