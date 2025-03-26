export enum EMapTypeId {
	HYBRID = "hybrid",
	ROADMAP = "roadmap",
	TERRAIN = "terrain",
	SATELLITE = "satellite",
}
export type EMapTypeIdLimited = EMapTypeId.ROADMAP | EMapTypeId.SATELLITE
