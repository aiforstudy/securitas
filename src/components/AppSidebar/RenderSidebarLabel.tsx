import { useNavigate } from "react-router-dom"

import { SidebarGroupLabel } from "../ui/sidebar"
import { ISidebarItem } from "./useSideBarItems"

const RenderSidebarLabel: React.FC<ISidebarItem> = ({ label, icon, path, prefixPath }) => {
	const navigate = useNavigate()
	const handleClick = () => {
		if (path) navigate(path)
	}
	return (
		<SidebarGroupLabel
			id={prefixPath ? prefixPath.split("/")[1] : ""}
			onClick={handleClick}
			className="pl-3 text-base mb-1 border-none"
		>
			{icon}
			<span className="text-[16px] font-semibold">{label}</span>
		</SidebarGroupLabel>
	)
}

export default RenderSidebarLabel
