import { useCreate, useList, useGo } from "@refinedev/core";
import { ApiResponse } from "../../types/forms.types";
import {
	Box,
	CircularProgress,
	Alert,
} from "@mui/material";
import { InsuranceFormSection } from "../../components/insurance-form-section";

export default function InsuranceCreate() {
	const {
		data: apiResponse,
		isError,
		isLoading,
	} = useList<ApiResponse>({
		resource: "insurance/forms",
	});

	const { mutate: createSubmission } = useCreate();
	const go = useGo();

	const handleSubmit = async (data: any, formId: string) => {
		createSubmission(
			{
				resource: "insurance/forms/submit",
				values: {
					formId,
					...data,
				},
			},
			{
				onSuccess: () => {
					go({
						to: {
							resource: "insurance/forms/submissions",
							action: "list",
						},
					});
				},
			}
		);
	};

	if (isLoading) return <CircularProgress />;
	if (isError) return <Alert severity="error">{error?.message}</Alert>;

	return (
		<Box className="max-w-2xl mx-auto p-6">
			{apiResponse?.data?.map((formSection) => (
				<InsuranceFormSection
					key={formSection.formId}
					formSection={formSection}
					onSubmit={handleSubmit}
				/>
			))}
		</Box>
	);
}
