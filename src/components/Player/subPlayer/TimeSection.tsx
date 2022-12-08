import React, { useEffect, useRef } from "react";
import Slider from "@mui/material/Slider";
import { formatTime } from "../../../utils/formatTime";
import { styled } from "@mui/material/styles";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import {
  changeIconPlay,
  setCurrentTime,
} from "../../../redux/features/audioSlice";

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

  const dispatch = useAppDispatch();

  // music stop on mount
  useEffect(() => {
    songRef?.current?.pause();
  }, []);

  // change play icon
  useEffect(() => {
    if (isPlay) songRef?.current?.play();
    else songRef?.current?.pause();
  }, [isPlay]);

  // set audio volume
  useEffect(() => {
    if (songRef?.current) songRef.current.volume = volume;
  }, [volume]);

  const handleChangeTime = (event: Event, newValue: number | number[]) => {
    // console.log(newValue);
    dispatch(setCurrentTime(newValue as number));
    if (songRef?.current) songRef.current.currentTime = newValue as number;
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
        }}
      ></audio>
    </div>
  );
};

export default TimeSection;
