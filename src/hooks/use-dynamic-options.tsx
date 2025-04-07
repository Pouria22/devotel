import { useState, useEffect, useRef } from "react";

export const useDynamicOptions = (
	apiResponse: any,
	watchAllFields: Record<string, any>
) => {
	const [dynamicOptions, setDynamicOptions] = useState<Record<string, any>>({});
	const previousCountry = useRef<string>();
	const abortControllerRef = useRef<AbortController>();

	useEffect(() => {
		const findDynamicFields = (fields: any[]): any[] => {
			let dynamicFields: any[] = [];
			fields.forEach((field) => {
				if (field.type === "group" && Array.isArray(field.fields)) {
					dynamicFields = [
						...dynamicFields,
						...findDynamicFields(field.fields),
					];
				}
				if (field.dynamicOptions) {
					dynamicFields.push(field);
				}
			});
			return dynamicFields;
		};

		const fetchOptions = async (
			fieldId: string,
			endpoint: string,
			dependsOn: string
		) => {
			const dependentValue = watchAllFields[dependsOn];

			if (
				!dependentValue ||
				(dependsOn === "country" && previousCountry.current === dependentValue)
			) {
				return;
			}

			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();

			try {
				const response = await fetch(
					`https://assignment.devotel.io${endpoint}?${dependsOn}=${dependentValue}`,
					{ signal: abortControllerRef.current.signal }
				);
				const data = await response.json();

				if (dependsOn === "country") {
					previousCountry.current = dependentValue;
				}

				setDynamicOptions((prev) => ({
					...prev,
					[fieldId]: data,
				}));
			} catch (error) {
				if (error.name !== "AbortError") {
					console.error("Error fetching options:", error);
				}
			}
		};

		if (apiResponse?.data) {
			const dynamicFields = apiResponse.data.flatMap((form: any) =>
				findDynamicFields(form.fields)
			);

			dynamicFields.forEach((field) => {
				if (field.dynamicOptions) {
					fetchOptions(
						field.id,
						field.dynamicOptions.endpoint,
						field.dynamicOptions.dependsOn
					);
				}
			});
		}

		return () => {
			abortControllerRef.current?.abort();
		};
	}, [apiResponse, JSON.stringify(watchAllFields)]);

	return { dynamicOptions };
};
