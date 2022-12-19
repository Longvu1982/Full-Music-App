import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
	const [searchKey, setSearchKey] = useState<string>("");
	const navigate = useNavigate();
	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			// do whatever
			navigate(`/${e.target.value}`);
		}
	};
	return (
		<div className="h-12 w-96 bg-third mb-10 rounded-sm overflow-hidden gap-2 flex items-center py-1 px-4">
			<FontAwesomeIcon className="text-light_title_color" icon={faSearch} />
			<input
				onKeyUp={(e) => handleKeyPress(e)}
				onChange={(e) => setSearchKey(e.target.value)}
				value={searchKey}
				placeholder="Nhập từ khoá tìm kiếm"
				className="outline-none w-full h-full bg-transparent text-light_title_color px-1"
				type="text"
			/>
		</div>
	);
};

export default SearchBar;
