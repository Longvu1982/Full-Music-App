const secondsToHms = (seconds: number) => {
	let d = Number(seconds);

	if (d <= 0) {
		return "0 giờ";
	} else {
		let h = Math.floor(d / 3600);
		let m = Math.floor((d % 3600) / 60);

		let hDisplay = h + " giờ ";
		let mDisplay = m <= 9 ? " 0" + m + " phút " : m + " phút ";

		return hDisplay + mDisplay;
	}
};
export default secondsToHms;
