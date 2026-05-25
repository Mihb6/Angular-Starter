export interface StreamingDestination {
  uuid: string;
  name: string;
  configuration: StreamingDestinationConfiguration;
  status: StreamingDestinationStatus,
  errorMessage: string;
}

export interface StreamingDestinationCreationDetails {
  name: string;
  configuration: StreamingDestinationConfiguration;
}

export enum StreamingDestinationStatus {
  DISABLED = 'DISABLED',
  READY = 'READY',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}

// User can set DISABLED (false) or READY (true)
export interface StreamingDestinationStatusUpdate {
  enabled: boolean;
}

export interface AmqpStreamingDestinationConfiguration {
  type: 'AmqpDestinationConfiguration'
  host: string;
  port: number;
  username: string;
  password: string;
  exchangeName: string;
}

export interface MqttStreamingDestinationConfiguration {
  type: 'MqttDestinationConfiguration'
  version: 'MQTT_3' | 'MQTT_5'
  host: string;
  port: number;
  username: string;
  password: string;
  baseTopic: string;
}

export type StreamingDestinationConfiguration = AmqpStreamingDestinationConfiguration | MqttStreamingDestinationConfiguration;

export interface StreamingDestinationReference {
  uuid: string;
  name: string;
}

export interface StreamConfiguration {
  uuid: string;
  streamingDestination: StreamingDestinationReference;
  feedNames: string[];
  typeConfiguration: boolean;
}

export interface StreamingConfigurationDetails {
  destinationUuid: string;
  feedNames: string[];
}
