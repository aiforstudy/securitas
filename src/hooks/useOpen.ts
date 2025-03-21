import React from "react"

const useOpen = (defaultOpen = false) => {
	const [open, setOpen] = React.useState(defaultOpen)
	return { open, setOpen }
}

export default useOpen
