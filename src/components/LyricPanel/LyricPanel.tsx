import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { setOpenLyric } from "../../redux/features/audioSlice";
import { getLyric } from "../../api/lyric";
import { Thumbnail } from "../Player/subPlayer/Thumbnail";

const LyricSection: React.FC<any> = ({ lyricRef, lyric }) => {
	// state to control smooth
	const [isScrollSmooth, setScrollSmooth] = useState<boolean>(false);

	// redux
	const currentTime = useAppSelector((state) => state.audio.currentTime) * 1000;
	const dispatch = useAppDispatch();

	// skip smooth on mount
	useEffect(() => {
		let arg: ScrollIntoViewOptions = {};
		// First time load
		console.log("isScrollSmooth :", isScrollSmooth);
		if (!isScrollSmooth) {
			arg = {
				inline: "center",
				block: "center",
			};
			setScrollSmooth(true);
		} else {
			arg = {
				behavior: "smooth",
				inline: "center",
				block: "center",
			};
		}
		lyricRef?.current?.scrollIntoView(arg);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTime]);

	return (
		<motion.div
			initial={{ y: "100vh" }}
			animate={{ y: 0 }}
			exit={{ y: "100vh" }}
			className="flex gap-20 items-center  justify-center border-2 border-border_color fixed bottom-0 right-2 shadow-slate-600 left-2 h-[95vh] rounded-t-2xl bg-third"
		>
			<div
				onClick={() => dispatch(setOpenLyric(false))}
				className="cursor-pointer text-secondary hover:brightness-110 absolute top-6 right-6 w-9 h-9 bg-light_title_color flex items-center justify-center rounded-full"
			>
				<FontAwesomeIcon icon={faX} />
			</div>
			<div className="scale-125 origin-bottom mt-20 border-2 border-border_color text-center text-light_title_color">
				<Thumbnail />
			</div>
			<div className="relative">
				<div className="w-[600px] pt-[200px] relative scrollbar-hide overflow-y-auto max-w-full shrink-0 grow-0 h-[550px]">
					{lyric?.map((item: any, index: number) => {
						return (
							<p
								ref={
									item?.words?.[0].startTime <= currentTime && item?.words?.at(-1).endTime >= currentTime
										? lyricRef
										: undefined
								}
								className="mb-4 w-fit flex items-center h-16"
							>
								{console.log("item?.word?.[0].startTime", item?.word?.[0].startTime)}
								{item?.words?.map((wordItem: any, wordIndex: number) => {
									return (
										<span
											className={`transition-all duration-75 text-3xl font-bold  mr-2 ${
												wordItem?.startTime <= currentTime && wordItem?.endTime >= currentTime
													? "text-yellow-500 text-4xl"
													: "text-light_title_color"
											}`}
										>
											{wordItem?.data}
										</span>
									);
								})}
							</p>
						);
					})}
				</div>
				<div className="lyric-container-overlay"></div>
			</div>
		</motion.div>
	);
};

const LyricPanel: React.FC = () => {
	const [lyric, setLyric] = useState<any[] | undefined>(undefined);
	const lyricRef: LegacyRef<HTMLParagraphElement> | undefined = useRef(null);

	const isLyric = useAppSelector((state) => state.audio.isLyric);
	const songId = useAppSelector((state) => state.audio.songId);

	// get lyric
	useEffect(() => {
		const fetchLyric = async () => {
			const getLyricDetail: any = await getLyric(songId as string);
			setLyric(getLyricDetail?.sentences);
		};
		fetchLyric();
	}, [songId]);

	console.log("lyric: ", lyric);

	return <AnimatePresence>{isLyric && <LyricSection lyric={lyric} lyricRef={lyricRef} />}</AnimatePresence>;
};

export default LyricPanel;
