import { Skeleton } from "@mui/material";
import React from "react";

const PlayList: React.FC<any> = ({ homeDetailsIndex, playlistTitle, playlistItems, navigate }) => {
	return (
		<div key={homeDetailsIndex}>
			{/* skeleton title */}
			{!playlistItems ? (
				<div className="mb-4">
					<Skeleton variant="rectangular" height={30} width={180} />
				</div>
			) : (
				<h3 className="text-2xl font-semibold mb-4 text-light_title_color">{playlistTitle || "Album"}</h3>
			)}

			{/* skeleton for playlist */}
			<div className="flex gap-4 flex-wrap mb-10">
				{(playlistItems ? playlistItems : Array.from(new Array(5))).map((item: any, index: number) => {
					return item ? (
						<div
							key={index}
							onClick={() => navigate(`/playlist/${item.encodeId}`)}
							className="relative cursor-pointer group w-[calc((100%_-_64px)/5)]"
						>
							<div className="rounded-md w-full aspect-square">
								<img className="max-w-none rounded-md w-full group-hover:blur-md transition-all" src={item.thumbnail} alt="" />
							</div>
							<div className="absolute top-0 left-0 rounded-md w-full aspect-square overflow-hidden">
								<img className="max-w-none w-full group-hover:scale-110 transition-all" src={item.thumbnailM} alt="" />
							</div>
							<p className="line-clamp-1 text-lg text-light_title_color font-semibold mt-2 mb-1">{item?.title}</p>
							<p className="line-clamp-2 text-lighter_text_color">{item.sortDescription}</p>
						</div>
					) : (
						<div key={index} className="w-[calc((100%_-_64px)/5)] aspect-square">
							<Skeleton variant="rectangular" width="100%" height="100%" />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PlayList;
