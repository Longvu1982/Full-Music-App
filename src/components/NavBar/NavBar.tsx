import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

const NavBar: React.FC = () => {
	const [activeBtn, setActiveBtn] = useState<number>(1);

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
	];

	return (
		<div className="pt-9 fixed flex flex-col gap-5 items-center top-0 left-0 w-16 h-screen bg-secondary border-r-[0.5px] border-r-border_color">
			{navBtns.map((item) => {
				return (
					<div key={item.id}
						onClick={item.onClick}
						className={`cursor-pointer rounded-full w-10 h-10 ${
							activeBtn === item.id ? "bg-light_title_color" : "bg-third "
						} flex items-center justify-center`}
					>
						<FontAwesomeIcon className="text-primary" icon={item.icon} />
					</div>
				);
			})}
		</div>
	);
};

export default NavBar;
