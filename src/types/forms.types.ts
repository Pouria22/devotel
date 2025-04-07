interface FieldValidation {
	min?: number;
	max?: number;
	pattern?: string;
}

interface DynamicOptions {
	dependsOn: string;
	endpoint: string;
	method: string;
}

interface FieldVisibility {
	dependsOn: string;
	condition: "equals" | "not_equals" | "greater_than" | "less_than";
	value: string | number;
}

interface BaseField {
	id: string;
	label: string;
	type: string;
	required: boolean;
	validation?: FieldValidation;
	visibility?: FieldVisibility;
}

interface TextField extends BaseField {
	type: "text";
}

interface NumberField extends BaseField {
	type: "number";
}

interface DateField extends BaseField {
	type: "date";
}

interface SelectField extends BaseField {
	type: "select";
	options?: string[];
	dynamicOptions?: DynamicOptions;
}

interface RadioField extends BaseField {
	type: "radio";
	options: string[];
}

interface CheckboxField extends BaseField {
	type: "checkbox";
	options: string[];
}

interface GroupField extends BaseField {
	type: "group";
	fields: FormField[];
}

// export type FormField =
// 	| TextField
// 	| NumberField
// 	| DateField
// 	| SelectField
// 	| RadioField
// 	| CheckboxField
// 	| GroupField;

export interface InsuranceForm {
	formId: string;
	title: string;
	fields: FormField[];
}

export interface ApiResponse {
	data: InsuranceForm[];
	total: number;
}

export interface ValidationRule {
  min?: number;
  max?: number;
  pattern?: string;
}

export interface DynamicOption {
  dependsOn: string;
  endpoint: string;
  method: string;
}

export interface Visibility {
  dependsOn: string;
  condition: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  validation?: ValidationRule;
  dynamicOptions?: DynamicOption;
  visibility?: Visibility;
  fields?: FormField[];
}

export interface InsuranceForm {
  formId: string;
  title: string;
  fields: FormField[];
}

export interface ApiResponse {
  data: InsuranceForm[];
}
export type FetchedForms = InsuranceForm;
