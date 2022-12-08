import { useEffect } from "react";

import { getSong, getInfoSong } from "../api/song";
import { useAppDispatch } from "../hooks/redux";
import {
  setDuration,
  setInfoSongPlayer,
  setSrcAudio,
} from "../redux/features/audioSlice";

export function useSetCurrentSong(encodeId: string){
  const dispatch = useAppDispatch();

  // get song details
  useEffect(() => {
    const fetchSong = async () => {
      const song = await getSong(encodeId);
      const infoSong = await getInfoSong(encodeId);
      console.log("infoSong :", infoSong);

      // save to redux
      dispatch(setSrcAudio(song?.[128]));
      dispatch(
        setInfoSongPlayer({
          title: infoSong.title,
          thumbnail: infoSong.thumbnailM,
          artistsNames: infoSong.artistsNames,
          artists: infoSong.artists,
        })
      );
      dispatch(setDuration(infoSong.duration));
    };
    fetchSong();
  }, [dispatch, getSong(encodeId), getInfoSong(encodeId)]);
};
