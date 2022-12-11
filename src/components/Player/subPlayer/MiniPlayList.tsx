import React from "react";
import { useRef, LegacyRef, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import "react-lazy-load-image-component/src/effects/blur.css";
import useClickSong from "../../../utils/handleClickSong";

const MiniPlayList: React.FC = () => {
  const playlistSong = useAppSelector((state) => state.audio.playlistSong);
  const songId = useAppSelector((state) => state.audio.songId);
  const activeRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);
  const clickSong = useClickSong();
  const songIdList = useAppSelector((state) => state.audio.playlistSong);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeRef, songId]);
  return (
    <div className="pt-4 absolute top-0 left-0 right-0 bottom-[260px] bg-secondary ">
      <div className="overflow-y-scroll h-full mx-4 shadow-insetContainer scrollbar-hide ">
        {playlistSong.map((item: any, index: number) => {
          return (
            <div
              onClick={() => {
                clickSong(
                  item?.id,
                  item?.streamingStatus,
                  songIdList,
                  undefined,
                  index
                );
              }}
              key={index}
              ref={item?.id === songId ? activeRef : undefined}
              className={`w-full ${
                item?.id === songId ? "bg-active" : ""
              } cursor-pointer hover:bg-third h-16 flex text-lighter_text_color text-base font-semibold border-b-[0.5px] border-b-border_color px-2 items-center`}
            >
              <div className="w-[45px] h-[45px] shrink-0 grow-0 overflow-hidden rounded-md">
                <LazyLoadImage alt="" effect="blur" src={item?.thumbnail} />
              </div>
              <div className="ml-3 text-left h-[48px] justify-between flex flex-col w-full items-start">
                <div className="w-full flex items-center relative line-clamp-1 text-light_title_color">
                  {item?.title}
                </div>
                <p className="line-clamp-1 font-medium">{item?.artists}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniPlayList;
