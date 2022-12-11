import React, { useEffect, useRef } from "react";
import Slider from "@mui/material/Slider";
import { formatTime } from "../../../utils/formatTime";
import { styled } from "@mui/material/styles";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import {
  changeIconPlay,
  setCurrentTime,
  setCurrnetIndexPlaylist,
  setSongId,
} from "../../../redux/features/audioSlice";
import { stat } from "fs";
import { getInfoSong, getSong } from "../../../api/song";
import { useSetCurrentSong } from "../../../utils/SetCurrentSong";
import useClickSong from "../../../utils/handleClickSong";

const TimeSlider = styled(Slider)({
  width: "180px",
  height: 2,
  "& .MuiSlider-track": {},
  "& .MuiSlider-thumb": {
    border: "1px solid #1976d2",
    height: 14,
    width: 14,
    backgroundColor: "#fff",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
});

const TimeSection: React.FC = () => {
  // reference for audio tag
  const songRef = useRef<HTMLAudioElement | null>(null);

  // redux state
  const isPlay = useAppSelector((state) => state.audio.isPlay);
  const srcAudio = useAppSelector((state) => state.audio.srcAudio);
  const isMute = useAppSelector((state) => state.audio.isMute);
  const duration = useAppSelector((state) => state.audio.duration);
  const volume = useAppSelector((state) => state.audio.volume);
  const currentTime = useAppSelector((state) => state.audio.currentTime);
  const isLoop = useAppSelector((state) => state.audio.isLoop);
  const isShuffle = useAppSelector((state) => state.audio.isShuffle);
  const clickSong = useClickSong();
  const setCurrentSong = useSetCurrentSong();
  const currnetIndexPlaylist = useAppSelector(
    (state) => state.audio.currnetIndexPlaylist
  );
  const playlistSong: any = useAppSelector((state) => state.audio.playlistSong);
  const songId = useAppSelector((state) => state.audio.songId);
  const dispatch = useAppDispatch();

  // music stop on mount
  useEffect(() => {
    songRef?.current?.pause();
  }, []);

  // change play icon
  useEffect(() => {
    if (isPlay) songRef?.current?.play();
    else songRef?.current?.pause();
  }, [isPlay, songId]);

  // set audio volume
  useEffect(() => {
    if (songRef?.current) songRef.current.volume = volume;
  }, [volume]);

  const handleChangeTime = (event: Event, newValue: number | number[]) => {
    // console.log(newValue);
    dispatch(setCurrentTime(newValue as number));
    if (songRef?.current) songRef.current.currentTime = newValue as number;
  };

  // useEffect(() => {
  //   const autoPlay = async () => {
  //     const songId = (playlistSong?.[currnetIndexPlaylist] as any)?.id;
  //     dispatch(setSongId(songId));
  //     const song = await getSong(songId);
  //     const infoSong = await getInfoSong(songId);
  //     setCurrentSong(song, infoSong, songId);
  //     // dispatch(changeIconPlay(true));
  //   };
  //   autoPlay();
  // }, [currnetIndexPlaylist]);

  const randomExcluded = (min: number, max: number, excluded: number) => {
    var n = Math.floor(Math.random() * (max - min) + min);
    if (n >= excluded) n++;
    return n;
  };

  const handlePlaySongOnEnded = () => {
    // if (!isShuffle) {
    //   if (currnetIndexPlaylist === playlistSong.length - 1)
    //     dispatch(setCurrnetIndexPlaylist(0));
    //   else dispatch(setCurrnetIndexPlaylist(currnetIndexPlaylist + 1));
    //   console.log(currnetIndexPlaylist);
    // } else {
    //   const randomIndex = randomExcluded(
    //     0,
    //     playlistSong.length - 1,
    //     currnetIndexPlaylist
    //   );
    //   dispatch(setCurrnetIndexPlaylist(randomIndex));
    // }
    let tempIndex;
    if (!isShuffle) {
      if (currnetIndexPlaylist === playlistSong.length - 1) tempIndex = 0;
      else tempIndex = currnetIndexPlaylist + 1;
    } else {
      tempIndex = randomExcluded(
        0,
        playlistSong.length - 1,
        currnetIndexPlaylist
      );
    }
    dispatch(setCurrnetIndexPlaylist(tempIndex));
    clickSong(
      playlistSong?.[tempIndex]?.id,
      1,
      playlistSong,
      undefined,
      tempIndex
    );
  };
  return (
    <div className="flex items-center justify-between">
      <span className="w-10 shrink-0 grow-0 text-left">
        {formatTime(currentTime)}
      </span>
      <TimeSlider
        max={duration}
        min={0}
        value={currentTime}
        onChange={handleChangeTime}
        defaultValue={0}
        aria-label="Temperature"
        valueLabelDisplay="off"
      />
      <span className="w-10 shrink-0 grow-0 text-right">
        {formatTime(duration)}
      </span>
      <audio
        autoPlay={isPlay}
        muted={isMute}
        loop={isLoop}
        ref={songRef}
        src={srcAudio}
        onTimeUpdate={(e) => {
          dispatch(setCurrentTime(e.currentTarget.currentTime));
        }}
        onEnded={() => {
          dispatch(changeIconPlay(false));
          handlePlaySongOnEnded();
        }}
      ></audio>
    </div>
  );
};

export default TimeSection;
