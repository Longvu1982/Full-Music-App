import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MusicCard: React.FC<any> = ({ item }) => {
	return (
		<>
			<FontAwesomeIcon className="mr-4" size="xs" icon={faMusic} />
			<div className="relative h-[45px] w-[45px]">
				{!item ? (
					<Skeleton width={45} variant="rectangular" height={45} />
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
					<Skeleton variant="rectangular" width={150} height={30} />
				) : (
					<>
						<div className="w-full flex items-center relative line-clamp-1 text-light_title_color">{item?.title}</div>
						<p className="line-clamp-1 font-medium">{item?.artistsNames}</p>
					</>
				)}
			</div>
		</>
	);
};

export default MusicCard;
