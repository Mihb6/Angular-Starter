export interface Widget extends WidgetPosition {
  uuid?: string;
  name: string;
  type: WidgetType;
  extras: Record<string, any> | any;
}

export interface WidgetPosition {
  uuid?: string;
  row: number;
  col: number;
  sizeX: number;
  sizeY: number;
}

export enum WidgetType {
  ACTUATOR = 'ACTUATOR',
  ATTRIBUTE = 'ATTRIBUTE',
  BAR = 'BAR',
  CHART = 'CHART',
  CONTAINER = 'CONTAINER',
  FEED_HISTORY = 'FEED_HISTORY',
  FEED = 'FEED',
  GAUGE = 'GAUGE',
  GRID = 'GRID',
  IMAGE = 'IMAGE',
  MAP = 'MAP',
  MESSAGES = 'MESSAGES',
  URL = 'URL',
}
