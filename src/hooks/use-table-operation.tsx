import { useMemo } from "react";
import { SubmissionData, TableState } from "../types/submitted-forms.type";

export const useTableOperations = (
	data: SubmissionData[] | undefined,
	tableState: TableState
) => {
	return useMemo(() => {
		if (!data) return [];

		let result = [...data];

		if (tableState.search) {
			const searchLower = tableState.search.toLowerCase();
			result = result.filter((row) =>
				Object.values(row).some((value) =>
					String(value).toLowerCase().includes(searchLower)
				)
			);
		}

		if (tableState.sortBy) {
			result.sort((a, b) => {
				const aValue = a[tableState.sortBy!];
				const bValue = b[tableState.sortBy!];

				if (typeof aValue === "number" && typeof bValue === "number") {
					return tableState.sortOrder === "asc"
						? aValue - bValue
						: bValue - aValue;
				}

				return tableState.sortOrder === "asc"
					? String(aValue).localeCompare(String(bValue))
					: String(bValue).localeCompare(String(aValue));
			});
		}

		return result;
	}, [data, tableState.search, tableState.sortBy, tableState.sortOrder]);
};
