import { DataType } from "../+common/data-type";

export interface SemanticTypeAttribute {
  name: string;
  required: boolean;
  readOnly: boolean;
  type: DataType;
  regex?: string;
  options: string[];
  minSize: number;
  maxSize: number;
  defaultValue: string;
  description: string | null;
}

export interface TypeAttributeCreationDetails {
  name: string;
  required: boolean;
  readOnly: boolean;
  type: DataType;
  regex?: string;
  options?: string[];
  minSize?: number;
  maxSize?: number;
  defaultValue?: string;
  description: string | null;
}

export interface TypeAttributeDescriptionDetails {
  value: string
}
