import React, { useEffect, useState } from "react";
import { getHomePlayList } from "../api/home";
import { getCharthome } from "../api/zingchart";
import LazyLoad from "react-lazy-load";
import { getSearch } from "../api/search";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Skeleton } from "@mui/material";

const HomePage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [homeDetails, setHomeDetails] = useState<any>();
	const [chartDetails, setChartDetails] = useState<any>();
	const [searchList, setSearchList] = useState<any>();

	const navigate = useNavigate();

	// get homepage data
	useEffect(() => {
		const fetchHome = async () => {
			const gethomeDetails = await getHomePlayList();
			// const getChartDetails = await getCharthome();
			// const getSearchLsit = await getSearch("waiting for you");
			setHomeDetails(gethomeDetails);
			// setChartDetails(getChartDetails);
			// setSearchList(getSearchLsit);

			// set loading
			setLoading(false);
		};
		fetchHome();
	}, []);

	console.log(homeDetails);
	console.log(chartDetails);
	console.log(searchList);

	const HomePageElement: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
		console.log(isLoading);
		return (
			<div className="w-full text-white">
				{(isLoading ? Array.from(new Array(5)) : homeDetails).map((homeDetailsItem: any, homeDetailsIndex: number) => {
					return (
						<div key={homeDetailsIndex}>
							{/* skeleton title */}
							{!homeDetailsItem ? (
								<div className="mb-4">
									<Skeleton variant="rectangular" height={30} width={180} />
								</div>
							) : (
								<h3 className="text-2xl font-semibold mb-4 text-light_title_color">
									{homeDetailsItem?.title || "Album"}
								</h3>
							)}

							{/* skeleton for playlist */}
							<div className="flex gap-4 flex-wrap mb-10">
								{(homeDetailsItem?.items ? homeDetailsItem?.items : Array.from(new Array(5))).map(
									(item: any, index: number) => {
										return item ? (
											<div
												key={index}
												onClick={() => navigate(`/playlist/${item.encodeId}`)}
												className="relative cursor-pointer group w-[calc((100%_-_64px)/5)]"
											>
												<div className="rounded-md w-full aspect-square">
													<LazyLoadImage
														className="max-w-none w-full group-hover:blur-md transition-all"
														src={item.thumbnail}
														alt=""
													/>
												</div>
												<div className="absolute top-0 left-0 rounded-md w-full aspect-square overflow-hidden">
													<LazyLoadImage
														className="max-w-none w-full group-hover:scale-110 transition-all"
														src={item.thumbnailM}
														alt=""
													/>
												</div>
												<p className="line-clamp-1 text-lg text-light_title_color font-semibold mt-2 mb-1">
													{item?.title}
												</p>
												<p className="line-clamp-2 text-lighter_text_color">{item.sortDescription}</p>
											</div>
										) : (
											<div className="w-[calc((100%_-_64px)/5)] aspect-square">
												<Skeleton variant="rectangular" width="100%" height="100%" />
											</div>
										);
									}
								)}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<>
			<HomePageElement isLoading={isLoading} />
		</>
	);
};

export default HomePage;
