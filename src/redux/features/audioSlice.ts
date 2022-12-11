import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
	currentPlayListId: string;
	isPlay: boolean;
	isMute: boolean;
	isShuffle: boolean;
	songId: string;
	currnetIndexPlaylist: number;
	infoSongPlayer?: {
		title: string;
		thumbnail: string;
		artistsNames: string;
		artists: Array<object>;
	};
	srcAudio: string;
	currentTime: number;
	duration: number;
	volume: number;
	isLoop: boolean;
	autoPlay: boolean;
	playlistSong: Array<object>;
	isLyric: boolean;
}

const initialState: AudioState = {
	isPlay: false,
	isMute: false,
	isShuffle: false,
	songId: localStorage.getItem("songId") || "",
	currnetIndexPlaylist: 0,
	infoSongPlayer: undefined,
	srcAudio: "",
	currentTime: 0,
	duration: 0,
	volume: Number(localStorage.getItem("volume")) || 0.5,
	isLoop: false,
	autoPlay: false,
	playlistSong: [],
	isLyric: false,
	currentPlayListId: ""
};

const audioSlice = createSlice({
	name: "audio",
	initialState,
	reducers: {
		changeIconPlay: (state, action: PayloadAction<boolean>) => {
			state.isPlay = action.payload;
		},
		changeIconVolume: (state, action: PayloadAction<boolean>) => {
			state.isMute = action.payload;
		},
		setSongId: (state, action: PayloadAction<string>) => {
			state.songId = action.payload;
			localStorage.setItem("songId", action.payload);
		},
		setPlayListId: (state, action: PayloadAction<string>) => {
			state.currentPlayListId = action.payload;
			localStorage.setItem("playListId", action.payload);
		},
		setInfoSongPlayer: (state, action: PayloadAction<any>) => {
			const { title, thumbnail, artistsNames, artists } = action.payload;
			state.infoSongPlayer = {
				title,
				thumbnail,
				artistsNames,
				artists,
			};
		},
		setSrcAudio: (state, action: PayloadAction<string>) => {
			state.srcAudio = action.payload;
		},
		setCurrentTime: (state, action: PayloadAction<number>) => {
			state.currentTime = action.payload;
		},
		setDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload;
		},
		setVolume: (state, action: PayloadAction<number>) => {
			state.volume = action.payload;
		},
		setLoop: (state, action: PayloadAction<boolean>) => {
			state.isLoop = action.payload;
		},
		setShuffle: (state, action: PayloadAction<boolean>) => {
			state.isShuffle = action.payload;
		},
		setAutoPlay: (state, action: PayloadAction<boolean>) => {
			state.autoPlay = action.payload;
		},
		setPlaylistSong: (state, action: PayloadAction<Array<object>>) => {
			state.playlistSong = action.payload;
		},
		setCurrnetIndexPlaylist: (state, action: PayloadAction<number>) => {
			state.currnetIndexPlaylist = action.payload;
		},
		setOpenLyric: (state, action: PayloadAction<boolean>) => {
			state.isLyric = action.payload;
		},
		
	},
});

export const {
	changeIconPlay,
	changeIconVolume,
	setSongId,
	setInfoSongPlayer,
	setCurrentTime,
	setDuration,
	setVolume,
	setLoop,
	setSrcAudio,
	setAutoPlay,
	setPlaylistSong,
	setCurrnetIndexPlaylist,
	setOpenLyric,
	setShuffle,
} = audioSlice.actions;
export default audioSlice.reducer;
