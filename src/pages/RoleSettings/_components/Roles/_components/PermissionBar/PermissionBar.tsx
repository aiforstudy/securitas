import { useEffect, useMemo, useState } from "react"

import { X } from "lucide-react"

type PermissionBarProps = {
	actions: string[]
	onChange?: (e: string[]) => void
}

const PermissionBar: React.FC<PermissionBarProps> = ({ actions, onChange }) => {
	const [innerActions, setInnerActions] = useState<string[]>([])

	useEffect(() => {
		setInnerActions(actions || [])
	}, [actions])

	const label = useMemo(() => {
		let text = "No Permission"
		if (innerActions.includes("read")) {
			text = "View"
		}

		if (innerActions.includes("edit")) {
			text = "Can Edit"
		}

		if (innerActions.includes("create") && innerActions.includes("delete")) {
			text = "Create, edit & delete"
		}

		return text
	}, [innerActions])

	return (
		<div className="flex flex-col items-start justify-start gap-1">
			<span className="text-[#4F4F4F] text-[12px] text-left">{label}</span>
			<div className="flex items-center gap-1 h-[15px] group">
				<button
					type="button"
					onMouseEnter={() => onChange && setInnerActions(["read"])}
					onMouseLeave={() => onChange && setInnerActions(actions)}
					onClick={() => onChange && onChange(["read"])}
					aria-label="Set view permission"
					tabIndex={onChange ? 0 : -1}
					className={`
						w-[35px] 
						${onChange ? "h-[8px]" : "h-[4px]"}
						${innerActions.includes("read") || innerActions.includes("edit") ? "bg-[#2F80ED]" : "bg-[#E0E0E0]"}
						rounded-[3px]
						${onChange ? "cursor-pointer" : "cursor-default"}
						border-0
						p-0
					`}
				/>
				<button
					type="button"
					onClick={() => onChange && onChange(["read", "create", "edit"])}
					onMouseEnter={() => onChange && setInnerActions(["edit"])}
					onMouseLeave={() => onChange && setInnerActions(actions)}
					aria-label="Set edit permission"
					tabIndex={onChange ? 0 : -1}
					className={`
						w-[35px] 
						${onChange ? "h-[8px]" : "h-[4px]"}
						${innerActions.includes("edit") ? "bg-[#2F80ED]" : "bg-[#E0E0E0]"}
						rounded-[3px]
						${onChange ? "cursor-pointer" : "cursor-default"}
						border-0
						p-0
					`}
				/>
				<button
					type="button"
					onClick={() => onChange && onChange(["read", "create", "edit", "delete"])}
					onMouseEnter={() => onChange && setInnerActions(["delete", "create", "edit"])}
					onMouseLeave={() => onChange && setInnerActions(actions)}
					aria-label="Set full permission"
					tabIndex={onChange ? 0 : -1}
					className={`
						w-[35px] 
						${onChange ? "h-[8px]" : "h-[4px]"}
						${innerActions.includes("create") && innerActions.includes("delete") ? "bg-[#2F80ED]" : "bg-[#E0E0E0]"}
						rounded-[3px]
						${onChange ? "cursor-pointer" : "cursor-default"}
						border-0
						p-0
					`}
				/>
				{onChange && (
					<button
						type="button"
						aria-label="Remove all permissions"
						onClick={() => onChange([])}
						className={`
							cursor-pointer 
							opacity-0 
							pointer-events-none
							${actions?.length ? "group-hover:opacity-100 group-hover:pointer-events-auto" : ""}
							p-0
							border-0
							bg-transparent
						`}
					>
						<X size={15} />
					</button>
				)}
			</div>
		</div>
	)
}

export default PermissionBar
