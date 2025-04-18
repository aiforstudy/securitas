import { ILiveViewDetailLayout, ILiveViewLayout, ILiveViewTemplate } from "@/types/liveView"
import instance from "@/utils/axios"

export default class LiveViewApi {
	static async getLiveViewTemplates(): Promise<ILiveViewTemplate[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		const mockData: ILiveViewTemplate[] = [
			{
				id: "945c061a-094b-11ee-be56-0242ac120001",
				cols: [{ col: 1 }],
				name: "1 Camera",
				order: 0,
				total_columns: 1,
			},
			{
				id: "945c061a-094b-11ee-be56-0242ac120003",
				cols: [{ col: 1 }, { col: 2 }, { col: 3 }, { col: 4 }],
				name: "4 Cameras",
				order: 1,
				total_columns: 2,
			},
			{
				id: "930e7e6e-dee4-4ca9-b7fc-694540ca0391",
				cols: [
					{ col: 1, grid_row_start: 1, grid_row_end: 3, grid_column_start: 1, grid_column_end: 3 },
					{ col: 2 },
					{ col: 3 },
					{ col: 4 },
					{ col: 5 },
					{ col: 6 },
				],
				name: "6 Cameras",
				order: 2,
				total_columns: 3,
			},
			{
				id: "930e7e6e-dee4-4ca9-b7fc-694540ca0392",
				cols: [
					{ col: 1, grid_row_start: 1, grid_row_end: 3, grid_column_start: 1, grid_column_end: 3 },
					{ col: 2, grid_row_start: 1, grid_row_end: 3, grid_column_start: 3, grid_column_end: 5 },
					{ col: 3, grid_row_start: 3, grid_row_end: 5, grid_column_start: 1, grid_column_end: 3 },
					{ col: 4 },
					{ col: 5 },
					{ col: 6 },
					{ col: 7 },
				],
				name: "7 Cameras",
				order: 3,
				total_columns: 4,
			},
			{
				id: "930e7e6e-dee4-4ca9-b7fc-694540ca0394",
				cols: [
					{ col: 1 },
					{ col: 2 },
					{ col: 3 },
					{ col: 4 },
					{ col: 5 },
					{ col: 6 },
					{ col: 7 },
					{ col: 8 },
					{ col: 9 },
				],
				name: "9 Cameras",
				order: 4,
				total_columns: 3,
			},
			{
				id: "930e7e6e-dee4-4ca9-b7fc-694540ca0395",
				cols: [
					{ col: 1, grid_row_start: 1, grid_row_end: 3, grid_column_start: 1, grid_column_end: 3 },
					{ col: 2 },
					{ col: 3 },
					{ col: 4 },
					{ col: 5 },
					{ col: 6, grid_row_start: 3, grid_row_end: 5, grid_column_start: 1, grid_column_end: 3 },
					{ col: 7 },
					{ col: 8 },
					{ col: 9 },
					{ col: 10 },
				],
				name: "10 Cameras",
				order: 5,
				total_columns: 4,
			},
		]

		return mockData
	}

	static async getLiveViewLayouts(): Promise<ILiveViewLayout[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		const mockData: ILiveViewLayout[] = [
			{
				id: "5340c568-6792-455e-96a4-20fb4c3de75d",
				name: "Default",
				created_at: "2024-07-11T15:43:02.000Z",
				updated_at: "2024-07-11T15:43:02.000Z",
				company_code: "demo",
				configuration_id: "930e7e6e-dee4-4ca9-b7fc-694540ca0391",
			},
		]

		return mockData
	}

	static async getLiveViewLayoutById(id: string): Promise<ILiveViewDetailLayout> {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		const mockData: ILiveViewDetailLayout = {
			id,
			name: "Default",
			layout: {
				name: "6 Cameras",
				activated: true,
				positions: [
					{ has_monitor: true, grid_settings: { col: 1 } },
					{ has_monitor: true, grid_settings: { col: 2 } },
					{ has_monitor: true, grid_settings: { col: 3 } },
					{ has_monitor: true, grid_settings: { col: 4 } },
					{ has_monitor: true, grid_settings: { col: 5 } },
					{ has_monitor: true, grid_settings: { col: 6 } },
				],
				total_columns: 3,
				configuration_id: "930e7e6e-dee4-4ca9-b7fc-694540ca0391",
			},
			company_code: "demo",
		}

		return mockData
	}

	static async createLiveViewLayout(data: ILiveViewDetailLayout): Promise<ILiveViewDetailLayout> {
		const response = await instance.post("/api/live-view/layouts", data)
		return response.data
	}

	static async updateLiveViewLayout(id: string, data: ILiveViewDetailLayout): Promise<ILiveViewDetailLayout> {
		const response = await instance.put(`/api/live-view/layouts/${id}`, data)
		return response.data
	}

	static async deleteLiveViewLayout(id: string): Promise<void> {
		await instance.delete(`/api/live-view/layouts/${id}`)
	}
}
