export interface TenantVariable {
  id: number;
  name: string;
  value: string;
}

export interface TenantVariableDto {
  name: string;
  value: string;
  password: string;
}

export interface TenantVariableBulkDeleteQueryParameters {
  ids: number[];
}
