import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { getSearch } from "../api/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PlayList from "../components/PLayList/PlayList";
import { setOpenToast } from "../redux/features/audioSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import ToastComponent from "../components/ToastComponent/ToastComponent";
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
								if (item.streamingStatus === 2) dispatch(setOpenToast(true));
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
						onClick={() => clickSong(item?.encodeId, item?.streamingStatus, item, index)}
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
	const [artists, setArtists] = useState<any>();
	const [songs, setSongs] = useState<any>();
	const [playLists, setPlayLists] = useState<any>();
	const [top, setTop] = useState<any>();
	const [videos, setVideos] = useState<any>();
	const { keyword } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchSearchDetails = async () => {
			const getSearchDetails: any = await getSearch(keyword as string);
			setArtists(getSearchDetails?.artists);
			setSongs(getSearchDetails?.songs);
			setPlayLists(getSearchDetails?.playlists);
			setTop(getSearchDetails?.top);
			setVideos(getSearchDetails?.videos);
		};
		fetchSearchDetails();
	}, [keyword]);

	console.log("artists", artists);
	console.log("songs", songs);
	console.log("playLists", playLists);
	console.log("top", top);
	console.log("videos", videos);

	return (
		<div>
			<MusicSection songs={songs} />
			<PlayList playlistTitle={"Playlists"} playlistItems={playLists} navigate={navigate} />
			<VideoSection videos={videos} />
			<ToastComponent />
		</div>
	);
};

export default SearchPage;
