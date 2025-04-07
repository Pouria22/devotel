import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string): DataProvider => ({
	getOne: async ({ id, resource }) => {
		const response = await fetch(`${url}/${resource}/${id}`);
		const data = await response.json();

		return {
			data,
		};
	},

	create: async ({ resource, variables }) => {
		const response = await fetch(`${url}/${resource}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(variables),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return {
			data,
		};
	},
	update: async () => {
		throw new Error("Not implemented");
	},
	deleteOne: async () => {
		throw new Error("Not implemented");
	},
	getList: async ({ resource }) => {
		const response = await fetch(`${url}/${resource}`);
		const data = await response.json();

		return {
			data,
			total: Array.isArray(data) ? data.length : 0,
		};
	},
	getApiUrl: () => url,
});
