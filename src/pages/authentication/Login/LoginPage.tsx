import React from "react"

import BlurCircleImage from "@/assets/images/blur-circle.png"

const LoginPage: React.FC = () => {
	return (
		<div className="relative h-full w-full p-6">
			<div className="col-span-2  flex items-center justify-center h-full  px-24 py-6 rounded-3xl overflow-hidden relative">
				<img
					src={BlurCircleImage}
					alt="blur-circle"
					className="absolute inset-0  h-full w-full  left-1/2 -top-52 -translate-x-1/2 z-10"
				/>
				<div className="bg-white w-fit rounded-3xl py-6 px-[70px] relative z-20">Login Page</div>
			</div>
		</div>
	)
}

export default LoginPage
