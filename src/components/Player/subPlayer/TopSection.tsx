import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { faVolumeTimes } from "@fortawesome/free-solid-svg-icons";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  changeIconVolume,
  setVolume,
} from "../../../redux/features/audioSlice";
import MiniPlayList from "./MiniPlayList";

const VolumeSlider = styled(Slider)({
  width: 2,
  height: 70,
  top: -9,
  '& input[type="range"]': {
    WebkitAppearance: "slider-vertical",
  },

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 10,
    width: 10,
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
});

const TopSection = () => {
  const volume = useAppSelector((state) => state.audio.volume);

  const [volumeValue, setVolumeValue] = useState<number>(volume * 100);
  const [preMuteVolume, setPreMuteVolume] = useState<number>(volumeValue);
  const [isShow, setShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // get volumne icon when volume change: mute - low - high
  const renderVolumeIcon = () => {
    // volume range
    let volumeIcon: IconDefinition = faVolumeUp;
    if (volumeValue === 0) volumeIcon = faVolumeTimes;
    else if (volumeValue <= 60 && volumeValue > 0) volumeIcon = faVolumeLow;

    // fontawesome component
    return (
      <FontAwesomeIcon
        onClick={handleMute}
        icon={volumeIcon}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );
  };

  const handleMute = () => {
    if (volumeValue > 0) {
      setVolumeValue(0);
      dispatch(changeIconVolume(true));
    } else {
      setVolumeValue(preMuteVolume);
      dispatch(changeIconVolume(false));
    }
  };

  const handleChangeVolume = (event: Event, newValue: number | number[]) => {
    setVolumeValue(newValue as number);
    dispatch(setVolume((newValue as number) / 100));
    // console.log(newValue);
    setPreMuteVolume(newValue as number);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className=" group w-9 h-9 cursor-pointer relative flex justify-center items-center hover:">
        <div className="absolute w-full left-0 bottom-0 h-0 opacity-0 group-hover:h-32 opac group-hover:opacity-100 rounded-2xl bg-primary flex items-center justify-center overflow-hidden transition-all">
          <VolumeSlider
            value={volumeValue}
            onChange={handleChangeVolume}
            orientation="vertical"
            defaultValue={volumeValue}
            aria-label="Temperature"
            valueLabelDisplay="off"
          />
        </div>
        {renderVolumeIcon()}
      </div>
      {isShow && <MiniPlayList />}

      <div
        onClick={() => setShow(!isShow)}
        className="hover:brightness-110 transition-all bg-third px-10 pt-1 pb-2 rounded-3xl cursor-pointer"
      >
        <span className="select-none">Danh sách phát</span>
      </div>

      <div className="w-9 h-9 flex justify-center items-center cursor-pointer hover:bg-primary rounded-full">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
    </div>
  );
};

export default TopSection;
