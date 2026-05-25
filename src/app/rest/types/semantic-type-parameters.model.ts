import { DataType } from "../+common/data-type";

export interface DeviceTypeParameterQueryParameters {
  query: string;
}

export interface DeviceTypeParameter {
  id: number;
  name: string;
  required: boolean;
  readOnly: boolean;
  type: DataType;
  regex: string;
  system: boolean;
  options: string[];
  dependency: ParameterDependency;
  minSize?: number;
  maxSize?: number;
  defaultValue?: string;
  value: string;
}

export interface ParameterDependency {
  parameterName: string;
  havingValue: string;
}
