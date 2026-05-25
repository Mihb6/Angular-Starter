import { User } from "../user-group/user-group-users.model";
import { Semantic } from "../data/semantic.model";

export interface Rule {
  uuid: string;
  name: string;
  description: string;
  content: string;
  status: RuleStatus;
  scopeGuid: string;
  scope: Semantic;
  traced: boolean;
  executionTracing: boolean;
  creatorName: string;
  creatorId: number;
  modifiedBy: User;
  owner: User;
  lastModification: number;
  creationDate: number;
  lastExecutionTime: number;
}

export interface AdvancedRuleCreationDto {
  name: string;
  description: string;
  content: string;
  status: RuleStatus;
  traced: boolean;
  scopeGuid: string;
  validate: boolean;
}

export enum RuleStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}

export interface ExecutionLogDto {
  timestamp: number;
  message: string;
}
