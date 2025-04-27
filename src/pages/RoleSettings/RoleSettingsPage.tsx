import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Roles from "./_components/Roles"
import Users from "./_components/Users"

type Tab = "users" | "roles"

const RoleSettingsPage: React.FC = () => {
	const { tab } = useParams()
	const [selectedTab, setSelectedTab] = useState<Tab>((tab as Tab) || "users")

	useEffect(() => {
		if (tab && (tab === "users" || tab === "roles")) {
			setSelectedTab(tab as Tab)
		}
	}, [tab])

	return (
		<Tabs className="p-5 w-full h-full" value={selectedTab} onValueChange={(value) => setSelectedTab(value as Tab)}>
			<TabsList className="w-[400px] min-h-12">
				<TabsTrigger value="users" className="text-md">
					Users
				</TabsTrigger>
				<TabsTrigger value="roles" className="text-md">
					Roles
				</TabsTrigger>
			</TabsList>
			<TabsContent value="users" className="flex flex-1">
				<Users />
			</TabsContent>
			<TabsContent value="roles" className="flex flex-1">
				<Roles />
			</TabsContent>
		</Tabs>
	)
}

export default RoleSettingsPage
