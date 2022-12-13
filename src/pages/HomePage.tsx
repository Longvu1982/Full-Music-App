import React, { useEffect, useState } from "react";
import { getHomePlayList } from "../api/home";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import PlayList from "../components/PLayList/PlayList";

const HomePage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [homeDetails, setHomeDetails] = useState<any>();
	const navigate = useNavigate();

	// get homepage data
	useEffect(() => {
		const fetchHome = async () => {
			const gethomeDetails = await getHomePlayList();
			console.log(gethomeDetails);
			setHomeDetails(gethomeDetails);

			// set loading
			setLoading(false);
		};
		fetchHome();
	}, []);

	const HomePageElement: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
		console.log(isLoading);
		return (
			<div className="w-full text-white">
				{(isLoading ? Array.from(new Array(5)) : homeDetails).map((homeDetailsItem: any, homeDetailsIndex: number) => {
					return (
						<PlayList
							playlistTitle={homeDetailsItem?.title}
							playlistItems={homeDetailsItem?.items}
							navigate={navigate}
						/>
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
