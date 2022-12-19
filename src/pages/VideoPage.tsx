/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getMV } from "../api/mv";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeIconPlay } from "../redux/features/audioSlice";

const VideoPage: React.FC = () => {
	const { videoId } = useParams();
	// const [video, setVideo] = useState<any>();
	const [videoSrcList, setVideoSrcList] = useState<{ [key: string]: string }>();
    const isPlay = useAppSelector(state => state.audio.isPlay)
    const dispatch = useAppDispatch()

	useEffect(() => {
        if(isPlay) dispatch(changeIconPlay(false))
		const fetchVideo = async () => {
			const getVideoDetails = await getMV(videoId as string);
			// setVideo(getVideoDetails);
			setVideoSrcList(getVideoDetails?.streaming?.mp4);
		};
		fetchVideo();
	}, [videoId]);

	const srcList = useMemo(() => {
		if (!videoSrcList) return undefined;
		let temp = { ...videoSrcList };
		return Object.entries(temp)
			.filter(([_key, value]) => value !== "")
			.map(([key, value]) => {
				return {
					quality: key,
					url: value,
				};
			});
	}, [videoSrcList]);

	return (
		<div>
			{srcList && <Player src={srcList} />}
		</div>
	);
};

export default VideoPage;
