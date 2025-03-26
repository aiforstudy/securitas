import { EFeedbackStatus, EUserFeedbackStatus } from "@/enums/alert"
import { IAlert } from "@/types/alert"
import { IGetListParams, IGetListResult } from "@/types/common"

// import instance from "@/utils/axios"

export default class AlertApi {
	static async getAlerts(params: IGetListParams): Promise<IGetListResult<IAlert>> {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 1000))

		// Generate 20 mockup alert records
		const mockAlerts: IAlert[] = Array.from({ length: 20 }, (_, index) => ({
			id: `alert-${index + 1}`,
			zone: {
				id: `zone-${index + 1}`,
				name: `Zone ${index + 1}`,
			},
			alert: true,
			engine: `engine-${index + 1}`,
			seq_no: `SEQ${index + 1}`,
			status: index % 3 === 0 ? "active" : index % 2 === 0 ? "pending" : "completed",
			camera: {
				id: `cam-${index + 1}`,
				name: `Camera ${index + 1}`,
				company_code: `COMP-${index + 1}`,
			},
			zone_id: `zone-${index + 1}`,
			comment: {
				read: index % 2 === 0,
				content: `Comment for alert ${index + 1}`,
				commented_at: new Date(Date.now() - index * 3600000).toISOString(),
			},
			company: {
				id: `company-${index + 1}`,
				name: `Company ${index + 1}`,
				company_code: `COMP-${index + 1}`,
			},
			approved: index % 2 === 0 ? "yes" : "no",
			ai_agent: index % 3 === 0 ? `agent-${index}` : null,
			camera_id: `cam-${index + 1}`,
			timestamp: new Date(Date.now() - index * 86400000).toISOString(),
			image_url: `https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1469&auto=format&fit=crop`,
			video_url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
			attributes: {
				confidence: 0.95 - index * 0.01,
				detected_objects: index + 1,
				is_verified: index % 2 === 0,
			},
			monitor_id: `monitor-${index + 1}`,
			created_at: new Date(Date.now() - index * 86400000).toISOString(),
			updated_at: new Date(Date.now() - index * 3600000).toISOString(),
			approved_by: index % 2 === 0 ? `user-${index}` : null,
			device_type: "camera",
			company_code: `COMP-${index + 1}`,
			edited_image: index % 3 === 0 ? `https://example.com/edited/alert-${index + 1}.jpg` : null,
			analytic_tags: index % 2 === 0 ? ["tag1", "tag2"] : null,
			user_feedback:
				index % 2 === 0
					? {
							id: `feedback-${index + 1}`,
							action: EUserFeedbackStatus.ACKNOWLEDGED,
							user_id: `user-${index + 1}`,
							timestamp: new Date(Date.now() - index * 3600000).toISOString(),
							created_at: new Date(Date.now() - index * 86400000).toISOString(),
							updated_at: new Date(Date.now() - index * 3600000).toISOString(),
							detection_id: `detection-${index + 1}`,
							company_code: `COMP-${index + 1}`,
							viact_username: `user${index + 1}@example.com`,
						}
					: null,
			raw_video_url: index % 2 === 0 ? `https://example.com/raw/alert-${index + 1}.mp4` : null,
			detection_type: index % 3 === 0 ? "motion" : "object",
			truck_capacity: index % 2 === 0,
			estimated_score: Math.round((0.95 - index * 0.02) * 100) / 100,
			feedback_status: index % 3 === 0 ? EFeedbackStatus.APPROVE : index % 2 === 0 ? EFeedbackStatus.REJECT : null,
			bounding_box_url: index % 2 === 0 ? `https://example.com/boxes/alert-${index + 1}.json` : null,
			trigger_workflows: [
				{ id: `workflow-${index}-1`, name: `Workflow ${index} A` },
				{ id: `workflow-${index}-2`, name: `Workflow ${index} B` },
			],
			detection_category: index % 3 === 0 ? "safety" : "security",
			automation_evaluate_status: index % 2 === 0,
		}))

		// Calculate pagination
		const { page, limit } = params
		const startIndex = (page - 1) * limit
		const endIndex = startIndex + limit
		const paginatedData = mockAlerts.slice(startIndex, endIndex)

		return {
			data: paginatedData,
			count: mockAlerts.length,
		}
	}
}
