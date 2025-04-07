import { FC } from "react";
import { SelectField } from "./field-types/select-field";
import { DateField } from "./field-types/date-field";
import { TextField } from "./field-types/text-field";
import { NumberField } from "./field-types/number-field";
import { FieldProps } from "../types/form-field.types";
import { CheckboxField } from "./field-types/checkbox-field";
import { RadioField } from "./field-types/radio-field";

interface FormFieldProps {
	field: FieldProps;
	register: any;
	control: any;
	errors: any;
	watchAllFields: Record<string, any>;
	dynamicOptions: Record<string, string[]>;
}

export const FormField: FC<FormFieldProps> = (props) => {
	const { field } = props;

	switch (field.type) {
		case "select":
			return <SelectField {...field} {...props} />;
		case "date":
			return <DateField {...field} {...props} />;
		case "text":
			return <TextField {...field} {...props} />;
		case "number":
			return <NumberField {...field} {...props} />;
		case "checkbox":
			return <CheckboxField {...field} {...props} />;
		case "radio":
			return <RadioField {...field} {...props} />;
		default:
			return null;
	}
};
