import React from "react";
import { useAppSelector } from "../../../hooks/redux";
import Skeleton from "@mui/material/Skeleton";

export const Thumbnail: React.FC = () => {
	const infoSong = useAppSelector((state) => state.audio.infoSongPlayer);

	return (
		<div className="w-[272px] bg-third rounded-sm mx-auto mt-4 p-4">
			<div className="w-full overflow-hidden rounded-sm aspect-square">
				{!infoSong ? (
					<Skeleton variant="rectangular" width={272} height={272} />
				) : (
					<img className=" max-w-none w-full h-full object-cover object-center" src={infoSong?.thumbnail} alt="" />
				)}
			</div>
			<h1 className="text-left text-sm font-bold mt-3 mb-1">{infoSong?.title}</h1>
			<p className="text-left text-[13px]">{infoSong?.artistsNames}</p>
		</div>
	);
};
