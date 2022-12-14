import React, { useEffect } from "react";
import { Thumbnail } from "./subPlayer/Thumbnail";
import Controls from "./subPlayer/Index";
import { getSong, getInfoSong } from "../../api/song";
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
      console.log("todayPlaylistId", todayPlaylistId);

      // fetch today playlist
      const todayPlaylist = await getDetailPlaylist(todayPlaylistId);

      // get random song in playlist
      const todayPlaylistTotal = todayPlaylist?.song?.total;
      const randomIndex = Math.floor(Math.random() * todayPlaylistTotal);
      dispatch(setCurrnetIndexPlaylist(randomIndex))

      // get the random song ID
      const todaySongLists = todayPlaylist?.song?.items;
      const randomSongId = todaySongLists?.[randomIndex]?.encodeId;
      console.log(randomSongId)
      dispatch(setSongId(randomSongId))

      // get song base on ID
      const song = await getSong(randomSongId);
      const infoSong = await getInfoSong(randomSongId);

      // save to redux
      setCurrentSong(song, infoSong, randomSongId);
      dispatch(
        setPlaylistSong(
          todaySongLists?.map((item: any) => {
            return {
              id: item?.encodeId,
              status: item?.streamingStatus,
              title: item?.title,
              thumbnail: item?.thumbnailM,
              artists: item?.artistsNames,
            };
          })
        )
      );
    };
    fetchSong();
  }, [dispatch, setCurrentSong]);

  return (
    <div className="fixed top-0 right-0 flex flex-col justify-between text-center float-right text-light_title_color w-80 h-screen bg-secondary border-l-[0.5px] border-l-border_color px-4">
      <Thumbnail />
      <Controls />
    </div>
  );
};

export default React.memo(Player);
