import { SVGProps } from "react"

export type ISvgIconProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export const SvgIcon: React.FC<ISvgIconProps> = ({ width, height, size, viewBox, children, ...props }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={viewBox || "0 0 24 24"}
			width={size || width || 24}
			height={size || height || 24}
			{...props}
		>
			{children}
		</svg>
	)
}
