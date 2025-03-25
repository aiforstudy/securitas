import React from "react"

import { Search } from "lucide-react"

import useDebounce from "@/hooks/useDebounce"
import { cn } from "@/lib/utils"

import { Input, InputVariants } from "../ui/input"

type SearchBoxProps = {
	className?: string
	startIcon?: React.ReactNode
	placeholder?: string
	onValueChange?: (value: string) => void
	isDebounce?: boolean
	delay?: number
	loading?: boolean
} & InputVariants

const SearchBox: React.FC<SearchBoxProps> = ({
	className,
	startIcon = <Search size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-foreground" />,
	placeholder,
	onValueChange,
	isDebounce = true,
	delay = 500,
	loading = false,
	...props
}) => {
	const [searchValue, setSearchValue] = React.useState("")

	const debouncedSearchTerm = useDebounce(searchValue, delay)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	React.useEffect(() => {
		if (!isDebounce) onValueChange?.(searchValue)
	}, [searchValue, onValueChange, isDebounce])

	React.useEffect(() => {
		if (isDebounce) onValueChange?.(debouncedSearchTerm)
	}, [debouncedSearchTerm, onValueChange, isDebounce])

	return (
		<div className={cn("w-full relative", className)}>
			{startIcon}
			<Input
				className={cn("w-full", {
					"pl-10": startIcon,
				})}
				placeholder={placeholder}
				value={searchValue}
				onChange={handleSearch}
				disabled={loading}
				{...props}
			/>
		</div>
	)
}

export default SearchBox
