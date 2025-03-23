import React from "react"

import { Settings as SettingsIcon } from "lucide-react"

const Settings: React.FC = () => {
	return (
		<div className="cursor-pointer w-[36px] h-[36px] rounded-md bg-gray-200  justify-center flex items-center gap-2">
			<SettingsIcon className="w-5 h-5" />
		</div>
	)
}

export default Settings
