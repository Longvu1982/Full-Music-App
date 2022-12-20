import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { getSearch } from "../api/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PlayList from "../components/PLayList/PlayList";
import { setOpenToast, setWarningMsg } from "../redux/features/audioSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
// import ToastComponent from "../components/ToastComponent/ToastComponent";
import MusicCard from "../components/MusicCard/MusicCard";
import useClickSong from "../utils/handleClickSong";

const VideoSection: React.FC<any> = ({ videos }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	return (
		<div>
			{videos && videos?.length > 0 && <h3 className="text-2xl font-semibold mb-4 text-light_title_color">Top MV</h3>}
			<div className="flex flex-wrap gap-4">
				{videos?.map((item: any, index: number) => {
					return (
						<div
							key={index}
							onClick={() => {
								if (item.streamingStatus === 2) {dispatch(setOpenToast(true))
								dispatch(setWarningMsg("Video chỉ dành cho tài khoản VIP !"))}
								else navigate(`/video/${item?.encodeId}`);
							}}
							className="group relative cursor-pointer flex flex-col flex-wrap gap-6 w-[calc((100%-32px)/3)]"
						>
							<div className="relative rounded-md overflow-hidden">
								<LazyLoadImage
									className="transition-all group-hover:scale-110 group-hover:brightness-50 w-full"
									src={item?.thumbnailM}
								/>

								<div className="absolute flex items-center justify-center rounded-full border-2 border-white w-[20%] max-w-[60px] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
									<FontAwesomeIcon className="w-[30%] h-[30%]" color="#fff" icon={faPlay} />
								</div>
							</div>
							{item?.streamingStatus === 2 && (
								<span className="text-gray-600 absolute tracking-widest right-0 top-0 bg-[#f4e570] text-[12px] font-semibold leading-3 py-2 px-2 text-center rounded-sm">
									VIP
								</span>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

const MusicSection: React.FC<any> = ({ songs }) => {
	const clickSong = useClickSong();
	const songId = useAppSelector((state) => state.audio.songId);
	return (
		<>
			{songs && songs?.length > 0 && <h3 className="text-2xl font-semibold mb-4 text-light_title_color">Bài hát</h3>}
			<div className="flex flex-wrap gap-4 mb-10">
				{songs?.map((item: any, index: number) => (
					<div
						onClick={() => clickSong(item?.encodeId, item?.streamingStatus, item, index, item)}
						key={index}
						className={`flex ${
							item?.encodeId === songId ? "bg-active item-active" : ""
						} h-16 cursor-pointer hover:bg-third border-b-[0.5px] border-b-border_color items-center w-[calc((100%-16px)/2)] shrink-0 grow-0 px-4 text-lighter_text_color font-semibold`}
					>
						<MusicCard item={item} />
					</div>
				))}
			</div>
		</>
	);
};
const SearchPage: React.FC = () => {
	// const [artists, setArtists] = useState<any>();
	const [songs, setSongs] = useState<any>();
	const [playLists, setPlayLists] = useState<any>();
	// const [top, setTop] = useState<any>();
	const [videos, setVideos] = useState<any>();
	const { keyword } = useParams();
	const [activeIndex, setActiveIndex] = useState<number>(1);
	const navigate = useNavigate();

	const TabButons = [
		{
			id: 1,
			name: "Tất cả",
			content: (
				<div>
					<MusicSection songs={songs?.slice(0,6)} />
					<PlayList playlistTitle={"Playlists"} playlistItems={playLists?.slice(0, 5)} navigate={navigate} />
					<VideoSection videos={videos?.slice(0, 3)} />
					{/* <ToastComponent /> */}
				</div>
			),
		},
		{
			id: 2,
			name: "Bài hát",
			content: (
				<div>
					<MusicSection songs={songs} />
				</div>
			),
		},
		{
			id: 3,
			name: "Playlist",
			content: (
				<div>
					<PlayList playlistTitle={"Playlists"} playlistItems={playLists} navigate={navigate} />
				</div>
			),
		},
		{
			id: 4,
			name: "Top MV",
			content: (
				<div>
					<VideoSection videos={videos} />
				</div>
			),
		},
	];

	useEffect(() => {
		const fetchSearchDetails = async () => {
			const getSearchDetails: any = await getSearch(keyword as string);
			// setArtists(getSearchDetails?.artists);
			setSongs(getSearchDetails?.songs);
			setPlayLists(getSearchDetails?.playlists);
			// setTop(getSearchDetails?.top);
			setVideos(getSearchDetails?.videos);
		};
		fetchSearchDetails();
	}, [keyword]);

	return (
		<>
			<div className="flex gap-8 mb-10">
				{TabButons?.map((item) => {
					return (
						<div onClick={() => setActiveIndex(item.id)} className="cursor-pointer" key={item.id}>
							<h1 className={`hover:brightness-110 pb-1 text-lg text-title_color ${item.id === activeIndex ? "border-b-2 border-b-[#1976d2]" : ""}`}>
								{item.name}
							</h1>
						</div>
					);
				})}
			</div>
			{TabButons.find((item) => item.id === activeIndex)?.content}
		</>
	);
};

export default SearchPage;
