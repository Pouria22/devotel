export interface TableState {
	page: number;
	pageSize: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	search?: string;
	visibleColumns: string[];
}

export interface SubmissionData {
	id: string;
	[key: string]: string | number;
}

export interface SubmissionsResponse {
	data: {
		columns: string[];
		data: SubmissionData[];
	};
}
