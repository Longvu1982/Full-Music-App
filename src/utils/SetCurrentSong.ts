import { useAppDispatch } from "../hooks/redux";
import {
  setDuration,
  setInfoSongPlayer,
  setSongId,
  setSrcAudio,
} from "../redux/features/audioSlice";

export function useSetCurrentSong() {
  const dispatch = useAppDispatch();

  // set song details to redux
  return (song: any, infoSong: any, encodeId: string) => {
    console.log(song)
    dispatch(setSongId(encodeId));
    dispatch(setSrcAudio(song?.data?.[128]));
    dispatch(
      setInfoSongPlayer({
        title: infoSong?.title,
        thumbnail: infoSong?.thumbnailM,
        artistsNames: infoSong?.artistsNames,
        artists: infoSong?.artists,
      })
    );
    dispatch(setDuration(infoSong?.duration));
  };
}
