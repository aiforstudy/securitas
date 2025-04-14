import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import SmartLockEvents from "./_components/SmartLockEvents"
import SmartLocks from "./_components/SmartLocks"

type Tab = "smart-locks" | "smart-lock-events"

const SmartLocksPage: React.FC = () => {
	const { tab } = useParams()
	const [selectedTab, setSelectedTab] = useState<Tab>((tab as Tab) || "smart-locks")

	useEffect(() => {
		if (tab && (tab === "smart-locks" || tab === "smart-lock-events")) {
			setSelectedTab(tab as Tab)
		}
	}, [tab])

	return (
		<Tabs className="p-5 w-full h-full" value={selectedTab} onValueChange={(value) => setSelectedTab(value as Tab)}>
			<TabsList className="w-[400px] min-h-12">
				<TabsTrigger value="smart-locks" className="text-md">
					Smart Locks
				</TabsTrigger>
				<TabsTrigger value="smart-lock-events" className="text-md">
					Events
				</TabsTrigger>
			</TabsList>
			<TabsContent value="smart-locks" className="flex flex-1">
				<SmartLocks />
			</TabsContent>
			<TabsContent value="smart-lock-events" className="flex flex-1">
				<SmartLockEvents />
			</TabsContent>
		</Tabs>
	)
}

export default SmartLocksPage
