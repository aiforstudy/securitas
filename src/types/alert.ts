import { EFeedbackStatus, EUserFeedbackStatus } from "@/enums/alert"

export type IAlert = {
	id: string
	zone: { id: string; name: string }
	alert: boolean
	engine: string
	seq_no: string
	status: string
	camera: { id: string; name: string; company_code: string }
	zone_id: string
	comment: IAlertComment
	company: { id: string; name: string; company_code: string }
	approved: string
	ai_agent: string | null
	camera_id: string
	timestamp: string
	image_url: string
	video_url: string
	attributes: { [key: string]: number | string | boolean }
	monitor_id: string
	created_at: string
	updated_at: string
	approved_by: string | null
	device_type: string
	company_code: string
	edited_image: string | null
	analytic_tags: string[] | null
	user_feedback: IAlertUserFeedback | null
	raw_video_url: string | null
	detection_type: string | null
	truck_capacity: boolean
	estimated_score: number
	feedback_status: EFeedbackStatus | null
	bounding_box_url: string | null
	trigger_workflows: { id: string; name: string }[]
	detection_category: string | null
	automation_evaluate_status: boolean
}

export type IAlertUserFeedback = {
	id: string
	action: EUserFeedbackStatus
	user_id: string
	timestamp: string
	created_at: string
	updated_at: string
	detection_id: string
	company_code: string
	viact_username: string | null
}

export type IAlertComment = {
	read: boolean
	content: string
	commented_at: string
}
