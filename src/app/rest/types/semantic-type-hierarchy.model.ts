import { SemanticType } from "./semantic-type.model";

export interface SemanticTypeSpecificChildDto {
  childType: SemanticType;
  name: string;
}

export interface SemanticTypeSpecificChildCreationDto {
  childTypeGuid: string;
  name: string;
  updatableByUser: boolean;
}

export interface SemanticTypeHierarchyUnAllowChildQueryParameters {
  childGuid: string;
}

export interface SemanticTypeHierarchyUnAllowParentQueryParameters {
  parentGuid: string;
}

export interface SemanticTypeHierarchyUnDefineSpecificChildQueryParameters {
  childGuid: string;
  name: string;
}

