import { getInfoSong, getSong } from "../api/song";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeIconPlay, setCurrnetIndexPlaylist, setOpenToast, setPlaylistSong, setWarningMsg } from "../redux/features/audioSlice";
import { useSetCurrentSong } from "./SetCurrentSong";

const useClickSong = () => {
	const dispatch = useAppDispatch();
	const songId = useAppSelector((state) => state.audio.songId);
	const setCurrentSong = useSetCurrentSong();
	return async (encodeId: string, streamingStatus: number, songIdList: any, playingIndex: number) => {
		if (songIdList && songIdList.length > 0) dispatch(setPlaylistSong(songIdList));
		if (streamingStatus === 2) {
			dispatch(setOpenToast(true));
			dispatch(setWarningMsg("Bài hát chỉ dành cho tài khoản VIP !"));
			return;
		} else {
			if (encodeId !== songId) {
				const song = await getSong(encodeId);
				console.log("song", song)
				console.log(encodeId)
				if(song?.err !== 0) {
					// alert(song?.msg)
					dispatch(setOpenToast(true));
					dispatch(setWarningMsg(song?.msg))
					return
				}
				const infoSong = await getInfoSong(encodeId);
				console.log("infoSong", infoSong)
				setCurrentSong(song, infoSong, encodeId);
				dispatch(changeIconPlay(true));
				dispatch(setCurrnetIndexPlaylist(0));
				dispatch(setCurrnetIndexPlaylist(playingIndex));
			}
		}
	};
};

export default useClickSong;
