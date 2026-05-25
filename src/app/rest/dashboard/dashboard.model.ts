import { WidgetType } from "../widget/widget.model";

export interface NewDashboard {
  name: string;
  scope: string;
  type: 'STATIC' | 'DYNAMIC';
  dynamicScopeType?: string;
  widgets: Widget[];
}

export interface Dashboard {
  uuid: string;
  name: string;
  favorite: boolean;
  scopeGuid: string;
  creatorName: string;
  width: number;
  height: number;
  phone: boolean;
  model: string;
  extras: string;
  creationDate: number;
  backgroundImage: string;
}

interface Widget extends SizeAndPosition {
  uuid: string;
  name: string;
  type: WidgetType | string;
  extras: any;
}

interface SizeAndPosition {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

export interface DashboardCreationDetails {
  name: string;
  scopeId: string;
  favorite: boolean;
}

export interface DashboardUpdateDetails {
  name: string;
  favorite: boolean;
}
