import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faMusic, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import SideLoading from "../SideLoading/SideLoading";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeIconPlay, setOpenLyric } from "../../redux/features/audioSlice";

const NavBar: React.FC = () => {
	const [activeBtn, setActiveBtn] = useState<number>(1);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();

	const isPlay = useAppSelector((state) => state.audio.isPlay);
	const isSongLoaded = useAppSelector((state) => state.audio.isSongLoaded);
	const isLyric = useAppSelector(state => state.audio.isLyric)

	const handleChangeTheme = (option: string) => {
		if (option === "add") document.body.classList.add("dark");
		else if (option === "remove") document.body.classList.remove("dark");
	};

	const navBtns = [
		{
			id: 1,
			icon: faMoon,
			onClick: () => {
				handleChangeTheme("add");
				setActiveBtn(1);
			},
		},
		{
			id: 2,
			icon: faSun,
			onClick: () => {
				handleChangeTheme("remove");
				setActiveBtn(2);
			},
		},
		{
			id: 3,
			icon: faHome,
			onClick: () => {
				navigate("/");
			},
			isHome: true,
		},
		{
			id: 4,
			icon: !isPlay ? faPlay : faPause,
			onClick: () => {
				if (isSongLoaded) {
					if (isPlay) dispatch(changeIconPlay(false));
					else dispatch(changeIconPlay(true));
				}
			},
			isHome: true,
			play: true,
		},
		{
			id: 5,
			icon: faMusic,
			onClick: () => {
				dispatch(setOpenLyric(true))
			},
			lyric: true
		},
	];

	return (
		<div className="pt-9 fixed flex flex-col gap-5 items-center top-0 left-0 w-16 h-screen bg-secondary border-r-[0.5px] border-r-border_color">
			{navBtns.map((item) => {
				return (
					<div
						key={item.id}
						onClick={item.onClick}
						className={`cursor-pointer rounded-full w-10 h-10 ${
							(item.lyric && isLyric) || item.play || activeBtn === item.id || (item.isHome && location.pathname === "/")
								? "bg-light_title_color"
								: "bg-third "
						} flex items-center justify-center hover:bg-light_title_color transition-all`}
					>
						{item.play ? (
							isSongLoaded ? (
								<FontAwesomeIcon className="text-primary" icon={item.icon} />
							) : (
								<SideLoading />
							)
						) : (
							<FontAwesomeIcon className="text-primary" icon={item.icon} />
						)}
					</div>
				);
			})}
		</div>
	);
};

export default NavBar;
