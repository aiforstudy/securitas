import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

import { ArrowLeft } from "lucide-react"

// import { PATH } from "@/constants/path"

const BackButton: React.FC = () => {
	const { pathname } = useLocation()
	const { t } = useTranslation()
	const navigate = useNavigate()

	const backButtonConfig = useMemo(
		() => [
			// {
			// 	url: PATH.CORP_ADMIN.USER_GROUP_MANAGEMENT.CREATE_USER_GROUP,
			// 	displayText: t("buttons.backTo.userGroupManagement"),
			// 	redirectUrl: PATH.CORP_ADMIN.USER_GROUP_MANAGEMENT.ROOT,
			// },
			// {
			// 	url: PATH.CORP_ADMIN.USER_MANAGEMENT.CREATE_USER,
			// 	displayText: t("buttons.backTo.userManagement"),
			// 	redirectUrl: PATH.CORP_ADMIN.USER_MANAGEMENT.ROOT,
			// },
			// {
			// 	url: PATH.CORP_ADMIN.USER_MANAGEMENT.EDIT_USER,
			// 	displayText: t("buttons.backTo.userManagement"),
			// 	redirectUrl: PATH.CORP_ADMIN.USER_MANAGEMENT.ROOT,
			// },
		],
		[t],
	)

	const getBackButtonConfig = (pathname: string) => {
		return backButtonConfig.find((config) => pathname.startsWith(config.url))
	}

	return (
		<div>
			{getBackButtonConfig(pathname) && (
				<div
					className="flex gap-[10px] items-center cursor-pointer"
					onClick={() => {
						const redirectUrl = getBackButtonConfig(pathname)?.redirectUrl
						if (redirectUrl) {
							navigate(redirectUrl)
						}
					}}
				>
					<ArrowLeft width={14} height={10} />
					<p className="text-base font-normal">{getBackButtonConfig(pathname)?.displayText}</p>
				</div>
			)}
		</div>
	)
}

export default BackButton
