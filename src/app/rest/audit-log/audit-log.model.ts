import { PageParameters } from "../rest.model";

export interface AuditLogQueryParams {
  from: number;
  to: number;
  limit?: number;
  query?: string;
}

export interface AuditLogPageParameters extends PageParameters, AuditLogQueryParams {}

export interface AuditLog {
  timestamp: number;
  message: string;
}
