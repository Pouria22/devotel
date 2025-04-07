export interface BaseFieldProps {
	id: string;
	label: string;
	required?: boolean;
	visibility?: {
		dependsOn: string;
		value: string;
		condition: "equals";
	};
}

export interface RadioFieldProps extends BaseFieldProps {
	type: "radio";
	options: string[];
}

export interface CheckboxFieldProps extends BaseFieldProps {
	type: "checkbox";
	options: string[];
}

export interface ValidationRules {
	required?: boolean | string;
	pattern?: { value: RegExp; message: string };
	min?: { value: number; message: string };
	max?: { value: number; message: string };
}

interface DynamicOption {
	dependsOn: string;
	endpoint: string;
	method: string;
}

export interface SelectFieldProps extends BaseFieldProps {
	type: "select";
	options?: string[];
	dynamicOptions?: DynamicOption;
}

export interface DateFieldProps extends BaseFieldProps {
	type: "date";
}

export interface TextFieldProps extends BaseFieldProps {
	type: "text";
	validation?: {
		pattern?: string;
	};
}

export interface NumberFieldProps extends BaseFieldProps {
	type: "number";
	validation?: {
		min?: number;
		max?: number;
	};
}

export type FieldProps =
	| SelectFieldProps
	| DateFieldProps
	| TextFieldProps
	| NumberFieldProps
	| RadioFieldProps
	| CheckboxFieldProps;
