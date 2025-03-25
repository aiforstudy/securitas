import React, { useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { createColumnHelper } from "@tanstack/react-table"

import { AppTable } from "@/components/AppTable"
import ImagePresent from "@/components/ImagePresent"
import ImagePreview from "@/components/ImagePreview"
import SearchBox from "@/components/SearchBox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import VideoPresent from "@/components/VideoPresent"
import VideoPreview from "@/components/VideoPreview"

type IAlert = {
	id: string
	cameraName: string
	engine: string
	createdAt: string
	companyName: string
	status: string
	approvedBy: string
	updatedBy: string
	imageUrl: string
	videoUrl: string
}

const columnHelper = createColumnHelper<IAlert>()

const AlertsPage: React.FC = () => {
	const [searchValue, setSearchValue] = useState("")
	const [openVideo, setOpenVideo] = useState<string>("")
	const [openImage, setOpenImage] = useState<string>("")
	console.log("🚀 ~ Alerts.tsx:14 ~ searchValue:", searchValue)

	const { data } = useQuery({
		queryKey: ["alerts"],
		queryFn: () => {
			return Promise.resolve({
				data: [
					{
						id: "ALT-001",
						cameraName: "Front Entrance",
						engine: "Motion Detection",
						createdAt: "2023-05-10T08:30:00Z",
						companyName: "ABC Security",
						status: "Active",
						approvedBy: "John Smith",
						updatedBy: "Jane Doe",
						imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1470&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
					},
					{
						id: "ALT-002",
						cameraName: "Parking Lot",
						engine: "Object Detection",
						createdAt: "2023-05-11T14:22:00Z",
						companyName: "ABC Security",
						status: "Resolved",
						approvedBy: "Mike Johnson",
						updatedBy: "Sarah Williams",
						imageUrl: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?q=80&w=1632&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
					},
					{
						id: "ALT-003",
						cameraName: "Back Door",
						engine: "Facial Recognition",
						createdAt: "2023-05-12T19:45:00Z",
						companyName: "XYZ Corp",
						status: "Pending",
						approvedBy: "Robert Brown",
						updatedBy: "Emily Davis",
						imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1470&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
					},
					{
						id: "ALT-004",
						cameraName: "Server Room",
						engine: "Motion Detection",
						createdAt: "2023-05-13T02:15:00Z",
						companyName: "XYZ Corp",
						status: "Active",
						approvedBy: "Thomas Wilson",
						updatedBy: "Lisa Martin",
						imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1470&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
					},
					{
						id: "ALT-005",
						cameraName: "Main Hallway",
						engine: "Object Detection",
						createdAt: "2023-05-14T11:30:00Z",
						companyName: "123 Security",
						status: "Resolved",
						approvedBy: "Daniel Taylor",
						updatedBy: "Amanda White",
						imageUrl: "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?q=80&w=1465&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
					},
					{
						id: "ALT-006",
						cameraName: "Reception Area",
						engine: "Facial Recognition",
						createdAt: "2023-05-15T16:20:00Z",
						companyName: "123 Security",
						status: "Active",
						approvedBy: "Kevin Anderson",
						updatedBy: "Jennifer Lee",
						imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1469&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
					},
					{
						id: "ALT-007",
						cameraName: "Loading Dock",
						engine: "Motion Detection",
						createdAt: "2023-05-16T09:10:00Z",
						companyName: "SecureTech",
						status: "Pending",
						approvedBy: "Christopher Moore",
						updatedBy: "Michelle Clark",
						imageUrl: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1470&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
					},
					{
						id: "ALT-008",
						cameraName: "Employee Entrance",
						engine: "Object Detection",
						createdAt: "2023-05-17T13:45:00Z",
						companyName: "SecureTech",
						status: "Active",
						approvedBy: "Brian Walker",
						updatedBy: "Stephanie Hall",
						imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1480&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
					},
					{
						id: "ALT-009",
						cameraName: "Warehouse",
						engine: "Facial Recognition",
						createdAt: "2023-05-18T17:30:00Z",
						companyName: "SafeGuard Inc",
						status: "Resolved",
						approvedBy: "Matthew Young",
						updatedBy: "Nicole King",
						imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
					},
					{
						id: "ALT-010",
						cameraName: "Executive Office",
						engine: "Motion Detection",
						createdAt: "2023-05-19T10:00:00Z",
						companyName: "SafeGuard Inc",
						status: "Active",
						approvedBy: "Andrew Scott",
						updatedBy: "Rachel Green",
						imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1469&auto=format&fit=crop",
						videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
					},
				],
			})
		},
	})

	const columns = useMemo(
		() => [
			columnHelper.accessor("videoUrl", {
				cell: (info) => {
					const videoUrl = info.getValue()
					const imageUrl = info.row.original.imageUrl
					if (videoUrl) {
						return <VideoPresent src={videoUrl} width={100} onClickPlay={() => setOpenVideo(videoUrl)} />
					}
					return <ImagePresent src={imageUrl} width={100} onClickPlay={() => setOpenImage(imageUrl)} />
				},
				header: () => <span>Alert</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("companyName", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Company Name</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("cameraName", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Camera Name</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("engine", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Engine</span>,
				footer: (info) => info.column.id,
			}),

			columnHelper.accessor("status", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Status</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("approvedBy", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Approved By</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("createdAt", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Created Date</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("createdAt", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Action</span>,
				footer: (info) => info.column.id,
			}),
		],
		[],
	)

	return (
		<div className="p-4 h-full space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-xl text-dark-700 font-semibold">List of alerts</h3>
				<div className="flex items-center gap-4">
					<div className="w-80">
						<SearchBox placeholder="Enter alert name" onValueChange={(value) => setSearchValue(value)} />
					</div>
				</div>
			</div>

			<AppTable<IAlert>
				options={{
					data: (data?.data || []) as IAlert[],
					columns: columns.filter((column) => column.id !== "actions"),
				}}
				// loading={{ spinning: isFetching }}
				pagination
				// onRowClick={handleViewUser}
				className="h-[calc(100%-44px-69px-16px)]"
			/>

			<Dialog open={!!openVideo} onOpenChange={() => setOpenVideo("")}>
				<DialogContent className="pt-12 !max-w-[800px]">
					<DialogHeader>
						<DialogTitle>Video Preview</DialogTitle>
					</DialogHeader>
					<div className="mt-5">
						<VideoPreview url={openVideo} />
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={!!openImage} onOpenChange={() => setOpenImage("")}>
				<DialogContent className="pt-12 !max-w-[800px]">
					<DialogHeader>
						<DialogTitle>Image Preview</DialogTitle>
					</DialogHeader>
					<div className="mt-5">
						<ImagePreview url={openImage} />
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default AlertsPage
