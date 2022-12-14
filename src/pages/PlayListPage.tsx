import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getDetailPlaylist } from "../api/detailPlaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatTime } from "../utils/formatTime";
import secondsToHms from "../utils/formatTimeToHour";
import { useAppSelector } from "../hooks/redux";
import { Skeleton } from "@mui/material";
import useClickSong from "../utils/handleClickSong";
// import ToastComponent from "../components/ToastComponent/ToastComponent";
import MusicCard from "../components/MusicCard/MusicCard";
// import { getArtist } from "../api/artist";
const PlayListPage: React.FC = () => {
	const { playListId } = useParams();
	const [playLists, setPlayList] = useState<any>();
	const [isLoading, setLoading] = useState<boolean>(true);
	const [songIdList, setSongIdList] = useState<any[]>();
	const clickSong = useClickSong();

	const songId = useAppSelector((state) => state.audio.songId);
	const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist);
	const activeRef: any = useRef(null);

	useEffect(() => {
		const fetchPlayList = async () => {
			const getPlayList = await getDetailPlaylist(playListId as string);
			// const getArtists = await getArtist("MONO-Nguyen-Viet-Hoang");
			const getSongIdList = getPlayList?.song?.items?.map((item: any) => {
				return {
					id: item?.encodeId,
					title: item?.title,
					status: item?.streamingStatus,
					thumbnail: item?.thumbnailM,
					artists: item?.artistsNames,
					duration: item?.duration,
					artistsNames: item?.artistsNames,
				};
			});
			setSongIdList(getSongIdList);
			setPlayList(getPlayList);
			setLoading(false);
		};
		fetchPlayList();
	}, [playListId]);

	// scroll to active song
	const scrollToActiveSong = (activeRef: any) => {
		if (activeRef?.current) {
			activeRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "nearest",
			});
		} 
	};
	useEffect(() => {
		scrollToActiveSong(activeRef);
	}, [isLoading, currnetIndexPlaylist, songId]);

	const ArtistsSection: React.FC = () => {
		return (
			<div className="my-20">
				<h1 className="text-title_color text-2xl font-semibold mb-10">Ngh??? S?? Tham Gia</h1>
				<div className="flex gap-6 flex-wrap">
					{playLists?.artists?.map((artistItem: any, artistIndex: number) => {
						return (
							<div key={artistIndex} className="flex flex-col w-full md:w-[calc((100%-96px)/5)] max-w-[240px] shrink-0 grow-0">
								<div className="w-full aspect-square">
									<img
										className="min-w-full min-h-full object-cover rounded-full hover:brightness-[1.3] transition-all cursor-pointer"
										src={artistItem?.thumbnailM}
										alt=""
									/>
								</div>

								<h1 className="font-semibold mt-3 text-light_title_color text-center">{artistItem?.name}</h1>
								<p className="text-center text-lighter_text_color">
									{Math.round(artistItem?.totalFollow / 1000)}K quan t??m
								</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="flex flex-col md:flex-row items-center md:items-start gap-10">
				{/* thumbnail section */}
				<div className="cursor-pointer max-w-full w-96 h-auto shink-0 grow-0">
					<div className="w-full group aspect-square rounded-lg overflow-hidden">
						{isLoading ? (
							<Skeleton variant="rectangular" width="100%" height="100%" />
						) : (
							<img className="w-full h-full group-hover:scale-110 transition-all" alt="" src={playLists?.thumbnailM} />
						)}
					</div>
					{isLoading ? (
						<Skeleton sx={{ margin: "15px auto" }} width={200} height={40} variant="rectangular" />
					) : (
						<>
							<h1 className="line-clamp-2 mt-3 text-center text-2xl font-semibold text-title_color">
								{playLists?.title}
							</h1>
							<p className="pt-1 text-center text-light_title_color">{`Ng??y ph??t h??nh: ${playLists?.releaseDate}`}</p>
							<p className="pt-1 px-4 line-clamp-1 text-center text-light_title_color">{playLists?.artistsNames}</p>
							<p className="pt-1 px-4 line-clamp-1 text-center text-light_title_color">{`${Math.round(
								playLists?.like / 1000
							)}K ng?????i th??ch`}</p>
						</>
					)}
				</div>

				{/* song lists section */}
				<div className="w-full">
					{/* description */}
					<div className="text-title_color text-base font-medium">
						<span className="pr-2 mr-2 font-medium border-r-[0.5px] border-r-border_color text-base text-lighter_text_color">
							L???i t???a
						</span>
						{playLists?.sortDescription}
					</div>

					{/* table header */}
					<div className="mt-3 w-full h-16 flex text-lighter_text_color text-base font-semibold border-b-[0.5px] border-b-border_color px-2">
						<div className=" flex items-center w-[50%] shrink-0 grow-0">
							<FontAwesomeIcon icon={faAward} />
							<p className="ml-4">B??I H??T</p>
						</div>
						<div className="hidden md:flex items-center w-[35%] shrink-0 grow-0 ">
							<p>ALBUM</p>
						</div>
						<div className="hidden md:flex items-center w-[15%] shrink-0 grow-0 ">
							<p className="w-full text-right">TH???I GIAN</p>
						</div>
					</div>

					{/* render song lists */}
					<div className="max-h-[calc(100vh_-_320px)]  mb-8 overflow-y-auto overflow-x-hidden shadow-insetContainer">
						{(isLoading ? Array.from(new Array(20)) : playLists?.song?.items)?.map((item: any, index: number) => {
							return (
								<div
									onClick={
										() => clickSong(item?.encodeId, item?.streamingStatus, songIdList, index, item)
										// handleClickSong(item?.encodeId, item?.streamingStatus)
									}
									ref={item?.encodeId === songId ? activeRef : undefined}
									key={index}
									className={`w-full ${
										item?.encodeId === songId ? "bg-active item-active" : ""
									} cursor-pointer hover:bg-third h-16 flex text-lighter_text_color text-base font-semibold border-b-[0.5px] border-b-border_color px-2`}
								>
									<div className="flex items-center w-full md:w-[50%] shrink-0 grow-0 pr-4">
										<MusicCard item={item} />
									</div>
									<div className="md:flex items-center hidden w-[35%] shrink-0 grow-0">
										{!item ? (
											<Skeleton variant="rectangular" width={150} height={30} />
										) : (
											<p className="line-clamp-1 font-medium">{item?.album?.title}</p>
										)}
									</div>
									<div className="md:flex hidden justify-end items-center w-[15%] shrink-0 grow-0 pr-3">
										{!item ? (
											<Skeleton variant="rectangular" width="60%" height={30} />
										) : (
											<p className="font-medium w-full text-right">{formatTime(item?.duration)}</p>
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
							<span className="w-auto pr-2 border-r-[0.5px] border-r-border_color text-sm text-light_title_color">{`${playLists?.song?.total} b??i h??t`}</span>
							<span className="pl-2 text-sm text-light_title_color">
								{secondsToHms(playLists?.song?.totalDuration)}
							</span>
						</>
					)}
				</div>
			</div>
			{playLists?.artists && <ArtistsSection />}
			{/* <ToastComponent /> */}
		</>
	);
};

export default PlayListPage;
