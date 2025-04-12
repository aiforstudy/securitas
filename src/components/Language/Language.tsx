import React, { HTMLAttributes, memo } from "react"
import { useTranslation } from "react-i18next"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LANGUAGES } from "@/constants/language"
import { STORAGE_KEYS } from "@/constants/storage"
import { useLang } from "@/contexts/lang.context"
import { localS } from "@/utils/storage"

import { EnFlag, VnFlag } from "../Icons"

type ILanguageProps = {
	isHiddenText?: boolean
	className?: HTMLAttributes<HTMLDivElement>["className"]
}

const Language: React.FC<ILanguageProps> = () => {
	const { t } = useTranslation()
	const { currentLang, setCurrentLang } = useLang()

	const changeLang = () => {
		const newLang = currentLang === LANGUAGES.EN ? LANGUAGES.VI : LANGUAGES.EN
		setCurrentLang(newLang)
		localS.set(STORAGE_KEYS.LANGUAGE, newLang)
	}

	const items = React.useMemo(
		() => [
			{
				label: t("common.language.en"),
				value: LANGUAGES.EN,
			},
			{
				label: t("common.language.vi"),
				value: LANGUAGES.VI,
			},
		],
		[t],
	)

	return (
		<Select value={currentLang} onValueChange={changeLang}>
			<SelectTrigger className="w-10 md:w-[140px] h-10 text-sm font-normal px-2 font-bricolage">
				<div className="flex items-center gap-2">
					{currentLang === LANGUAGES.EN ? <EnFlag /> : <VnFlag />}
					<p className="hidden md:block">
						<SelectValue placeholder={t("selects.placeholder.choose")} />
					</p>
				</div>
			</SelectTrigger>
			<SelectContent className="!rounded-md">
				<SelectGroup>
					{items.map((item) => (
						<SelectItem value={item.value} key={`language-${item.value}`} className="text-sm">
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default memo(Language)
