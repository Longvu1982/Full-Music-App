import { getInfoSong, getSong } from "../api/song";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeIconPlay, setCurrnetIndexPlaylist, setPlaylistSong } from "../redux/features/audioSlice";
import { useSetCurrentSong } from "./SetCurrentSong";

const useClickSong = () => {
  const dispatch = useAppDispatch();
  const songId = useAppSelector((state) => state.audio.songId);
  const setCurrentSong = useSetCurrentSong()
  return async (encodeId: string, streamingStatus: number, songIdList: any, setOpenToast: any, playingIndex: number) => {
    if (songIdList && songIdList.length > 0)
      dispatch(setPlaylistSong(songIdList));
    // console.log(encodeId + " " + songId);
    if (streamingStatus === 2) {
      setOpenToast(true);
      return;
    } else {
      if (encodeId !== songId) {
        const song = await getSong(encodeId);
        const infoSong = await getInfoSong(encodeId);
        // console.log("infoSong :", infoSong);

        // // save to redux
        // dispatch(setSongId(encodeId));
        // dispatch(setSrcAudio(song?.[128]));
        // dispatch(
        // 	setInfoSongPlayer({
        // 		title: infoSong.title,
        // 		thumbnail: infoSong.thumbnailM,
        // 		artistsNames: infoSong.artistsNames,
        // 		artists: infoSong.artists,
        // 	})
        // );
        // dispatch(setDuration(infoSong.duration));
        setCurrentSong(song, infoSong, encodeId);

        // SetCurrentSong(song, infoSong)
        dispatch(changeIconPlay(true));

        // save curretn index
        dispatch(setCurrnetIndexPlaylist(0))
        dispatch(setCurrnetIndexPlaylist(playingIndex))
        
      }
    }
  };
};

export default useClickSong;
