import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailPlaylist } from "../api/detailPlaylist";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatTime } from "../utils/formatTime";
import secondsToHms from "../utils/formatTimeToHour";

const PlayListPage: React.FC = () => {
	const { playListId } = useParams();
	const [playLiplayListIdst, setPlayList] = useState<any>();

	useEffect(() => {
		const fetchPlayList = async () => {
			const getPlayList = await getDetailPlaylist(playListId as string);
			setPlayList(getPlayList);
		};
		fetchPlayList();
	}, [playListId]);

	console.log(playLiplayListIdst);

	return (
		<div className="flex gap-10">
			{/* thumbnail section */}
			<div className="w-96 h-auto shink-0 grow-0">
				<div className="w-full aspect-square rounded-lg overflow-hidden">
					<LazyLoadImage src={playLiplayListIdst?.thumbnailM} />
				</div>
				<h1 className="line-clamp-2 mt-3 text-center text-2xl font-semibold text-title_color">{playLiplayListIdst?.title}</h1>
				<p className="pt-1 text-center text-light_title_color">{`Ngày phát hành: ${playLiplayListIdst?.releaseDate}`}</p>
				<p className="pt-1 px-4 line-clamp-1 text-center text-light_title_color">{playLiplayListIdst?.artistsNames}</p>
				<p className="pt-1 px-4 line-clamp-1 text-center text-light_title_color">{`${Math.round(
					playLiplayListIdst?.like / 1000
				)}K người thích`}</p>
			</div>

			{/* song lists section */}
			<div className="w-full">
				{/* description */}
				<div className="text-title_color text-base font-medium">
					<span className="pr-2 mr-2 font-medium border-r-[0.5px] border-r-border_color text-base text-lighter_text_color">Lời tựa</span>
					{playLiplayListIdst?.sortDescription}
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
				<div className="max-h-[500px]  mb-8 overflow-y-auto shadow-insetContainer">
					{playLiplayListIdst?.song?.items?.map((item: any, index: number) => {
						return (
							<div
								key={index}
								className="w-full cursor-pointer hover:bg-third h-16 flex text-lighter_text_color text-base font-semibold border-b-[0.5px] border-b-border_color px-2"
							>
								<div className="flex items-center w-[50%] shrink-0 grow-0 pr-4">
									<FontAwesomeIcon className="mr-4" size="xs" icon={faMusic} />
									<div>
										<LazyLoadImage
											effect="blur"
											className="rounded-md shrink-0 grow-0"
											width={45}
											height={45}
											src={item?.thumbnail}
										/>
									</div>
									<div className="ml-3 flex flex-col">
										<h1 className="line-clamp-1 text-light_title_color">{item?.title}</h1>
										<p>{item?.artistsNames}</p>
									</div>
								</div>
								<div className="flex items-center w-[35%] shrink-0 grow-0">
									<p>{item?.album?.title}</p>
								</div>
								<div className="flex items-center w-[15%] shrink-0 grow-0 pr-3">
									<p className="w-full text-right">{formatTime(item?.duration)}</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* footer details */}
				<span className="w-auto pr-2 border-r-[0.5px] border-r-border_color text-sm text-light_title_color">{`${playLiplayListIdst?.song?.total} bài hát`}</span>
				<span className="pl-2 text-sm text-light_title_color">
					{secondsToHms(playLiplayListIdst?.song?.totalDuration)}
				</span>
			</div>
		</div>
	);
};

export default PlayListPage;
