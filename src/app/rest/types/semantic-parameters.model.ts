import { DataType } from "../+common/data-type";
import { ParameterDependency } from "./semantic-type-parameters.model";

export interface DeviceParameter {
  id: number;
  name: string;
  required: boolean;
  readOnly: boolean;
  system: boolean;
  type: DataType;
  regex: string;
  options: string;
  dependency: ParameterDependency;
  minSize?: number;
  maxSize?: number;
  value?: string;
}