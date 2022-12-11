import React, { useEffect, useState, useRef, LegacyRef } from "react";
import { useParams } from "react-router-dom";
import { getDetailPlaylist } from "../api/detailPlaylist";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatTime } from "../utils/formatTime";
import secondsToHms from "../utils/formatTimeToHour";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeIconPlay, setPlaylistSong } from "../redux/features/audioSlice";
import { getInfoSong, getSong } from "../api/song";
import { Alert, Skeleton, Snackbar } from "@mui/material";
import { useSetCurrentSong } from "../utils/SetCurrentSong";
import useClickSong from "../utils/handleClickSong";

const PlayListPage: React.FC = () => {
  const { playListId } = useParams();
  const [playLists, setPlayList] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isOpenToast, setOpenToast] = useState<boolean>(false);
  const [songIdList, setSongIdList] = useState<any[]>();
  const clickSong = useClickSong();

  const songId = useAppSelector((state) => state.audio.songId);
  const currnetIndexPlaylist = useAppSelector(
    (state) => state.audio.currnetIndexPlaylist
  );
  const dispatch = useAppDispatch();
  const setCurrentSong = useSetCurrentSong();
  const activeRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);

  useEffect(() => {
    const fetchPlayList = async () => {
      const getPlayList = await getDetailPlaylist(playListId as string);
      console.log(getPlayList);
      const getSongIdList = getPlayList?.song?.items?.map((item: any) => {
        return {
          id: item?.encodeId,
          title: item?.title,
          thumbnail: item?.thumbnailM,
          artists: item?.artistsNames,
        };
      });
      setSongIdList(getSongIdList);
      setPlayList(getPlayList);
      setLoading(false);
    };
    fetchPlayList();
  }, [playListId]);

  // scroll to active song
  useEffect(() => {
    if (activeRef.current) {
      console.log(activeRef.current);
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      console.log("fire scroll");
    } else console.log("not exist");
  }, [isLoading, currnetIndexPlaylist, songId]);

  console.log(playLists?.thumbnailM);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  const ArtistsSection: React.FC = () => {
    return (
      <div className="my-20">
        <h1 className="text-title_color text-2xl font-semibold mb-10">
          Nghệ Sĩ Tham Gia
        </h1>
        <div className="flex gap-6">
          {playLists?.artists?.map((artistItem: any, artistIndex: number) => {
            return (
              <div
                key={artistIndex}
                className="flex flex-col w-[calc((100%-96px)/5)] max-w-[240px] shrink-0 grow-0"
              >
                <div className="w-full aspect-square">
                  <img
                    className="min-w-full min-h-full object-cover rounded-full hover:brightness-[1.3] transition-all cursor-pointer"
                    src={artistItem?.thumbnailM}
                    alt=""
                  />
                </div>

                <h1 className="font-semibold mt-3 text-light_title_color text-center">
                  {artistItem?.name}
                </h1>
                <p className="text-center text-lighter_text_color">
                  {Math.round(artistItem?.totalFollow / 1000)}K quan tâm
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const ToastComponent: React.FC = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpenToast}
        onClose={handleClose}
        autoHideDuration={2000}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Bài hát chỉ dành cho tài khoản VIP !
        </Alert>
      </Snackbar>
    );
  };
  return (
    <>
      <div className="flex gap-10">
        {/* thumbnail section */}
        <div className="cursor-pointer w-96 h-auto shink-0 grow-0">
          <div className="w-full group aspect-square rounded-lg overflow-hidden">
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : (
              <img
                className="group-hover:scale-110 transition-all"
                alt=""
                src={playLists?.thumbnailM}
              />
            )}
          </div>
          {isLoading ? (
            <Skeleton
              sx={{ margin: "15px auto" }}
              width={200}
              height={40}
              variant="rectangular"
            />
          ) : (
            <>
              <h1 className="line-clamp-2 mt-3 text-center text-2xl font-semibold text-title_color">
                {playLists?.title}
              </h1>
              <p className="pt-1 text-center text-light_title_color">{`Ngày phát hành: ${playLists?.releaseDate}`}</p>
              <p className="pt-1 px-4 line-clamp-1 text-center text-light_title_color">
                {playLists?.artistsNames}
              </p>
              <p className="pt-1 px-4 line-clamp-1 text-center text-light_title_color">{`${Math.round(
                playLists?.like / 1000
              )}K người thích`}</p>
            </>
          )}
        </div>

        {/* song lists section */}
        <div className="w-full">
          {/* description */}
          <div className="text-title_color text-base font-medium">
            <span className="pr-2 mr-2 font-medium border-r-[0.5px] border-r-border_color text-base text-lighter_text_color">
              Lời tựa
            </span>
            {playLists?.sortDescription}
          </div>

          {/* table header */}
          <div className="mt-3 w-full h-16 flex text-lighter_text_color text-base font-semibold border-b-[0.5px] border-b-border_color px-2">
            <div className=" flex items-center w-[50%] shrink-0 grow-0">
              <FontAwesomeIcon icon={faAward} />
              <p className="ml-4">BÀI HÁT</p>
            </div>
            <div className=" flex items-center w-[35%] shrink-0 grow-0 ">
              <p>ALBUM</p>
            </div>
            <div className="flex items-center w-[15%] shrink-0 grow-0 ">
              <p className="w-full text-right">THỜI GIAN</p>
            </div>
          </div>

          {/* render song lists */}
          <div className="max-h-[calc(100vh_-_320px)]  mb-8 overflow-y-auto shadow-insetContainer">
            {(isLoading
              ? Array.from(new Array(20))
              : playLists?.song?.items
            )?.map((item: any, index: number) => {
              return (
                <div
                  onClick={
                    () =>
                      clickSong(
                        item?.encodeId,
                        item?.streamingStatus,
                        songIdList,
                        setOpenToast,
                        index
                      )
                    // handleClickSong(item?.encodeId, item?.streamingStatus)
                  }
                  ref={item?.encodeId === songId ? activeRef : undefined}
                  key={index}
                  className={`w-full ${
                    item?.encodeId === songId ? "bg-active item-active" : ""
                  } cursor-pointer hover:bg-third h-16 flex text-lighter_text_color text-base font-semibold border-b-[0.5px] border-b-border_color px-2`}
                >
                  <div className="flex items-center w-[50%] shrink-0 grow-0 pr-4">
                    <FontAwesomeIcon
                      className="mr-4"
                      size="xs"
                      icon={faMusic}
                    />
                    <div className="relative h-[45px] w-[45px]">
                      {!item ? (
                        <Skeleton
                          width={45}
                          variant="rectangular"
                          height={45}
                        />
                      ) : (
                        <LazyLoadImage
                          effect="blur"
                          className="rounded-md shrink-0 grow-0"
                          width={45}
                          height={45}
                          src={item?.thumbnail}
                        />
                      )}
                      {item?.streamingStatus === 2 && (
                        <span className="text-gray-600 absolute tracking-widest right-0 top-0 -translate-y-1/2 translate-x-2 bg-[#f4e570] text-[10px] leading-3 py-[2px] px-1 rounded-sm">
                          VIP
                        </span>
                      )}
                    </div>
                    <div className="ml-3 h-[48px] justify-between flex flex-col w-full">
                      {!item ? (
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      ) : (
                        <>
                          <div className="w-full flex items-center relative line-clamp-1 text-light_title_color">
                            {item?.title}
                          </div>
                          <p className="line-clamp-1 font-medium">
                            {item?.artistsNames}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center w-[35%] shrink-0 grow-0">
                    {!item ? (
                      <Skeleton variant="rectangular" width={150} height={30} />
                    ) : (
                      <p className="line-clamp-1 font-medium">
                        {item?.album?.title}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end items-center w-[15%] shrink-0 grow-0 pr-3">
                    {!item ? (
                      <Skeleton variant="rectangular" width="60%" height={30} />
                    ) : (
                      <p className="font-medium w-full text-right">
                        {formatTime(item?.duration)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* footer details */}
          {isLoading ? (
            <></>
          ) : (
            <>
              <span className="w-auto pr-2 border-r-[0.5px] border-r-border_color text-sm text-light_title_color">{`${playLists?.song?.total} bài hát`}</span>
              <span className="pl-2 text-sm text-light_title_color">
                {secondsToHms(playLists?.song?.totalDuration)}
              </span>
            </>
          )}
        </div>
      </div>
      {playLists?.artists && <ArtistsSection />}
      <ToastComponent />
    </>
  );
};

export default PlayListPage;
