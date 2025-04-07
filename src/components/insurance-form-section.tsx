import { useForm } from "@refinedev/react-hook-form";
import { useDynamicOptions } from "../hooks/use-dynamic-options";
import { Box, Button, Paper, Typography } from "@mui/material";
import { FormSection } from "./form-section";


export const InsuranceFormSection: React.FC<{
	formSection: any;
	onSubmit: (data: any, formId: string) => void;
}> = ({ formSection, onSubmit }) => {
	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		refineCoreProps: {
			resource: "insurance/forms/submit",
			action: "create",
		},
	});

	const watchAllFields = watch();
	const { dynamicOptions } = useDynamicOptions(
		{ data: [formSection] },
		watchAllFields
	);

	return (
		<Paper
			elevation={3}
			sx={{
				mb: 4,
				overflow: "hidden",
				borderRadius: 2,
			}}
		>
			<Box
				sx={{
					bgcolor: "primary.main",
					color: "primary.contrastText",
					p: 2,
					mb: 2,
				}}
			>
				<Typography variant="h5">{formSection.title}</Typography>
			</Box>
			<Box sx={{ p: 3 }}>
				<form
					onSubmit={handleSubmit((data) => onSubmit(data, formSection.formId))}
				>
					<FormSection
						fields={formSection.fields}
						register={register}
						control={control}
						errors={errors}
						watchAllFields={watchAllFields}
						dynamicOptions={dynamicOptions}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						fullWidth
						sx={{ mt: 3 }}
					>
						Submit {formSection.title}
					</Button>
				</form>
			</Box>
		</Paper>
	);
};