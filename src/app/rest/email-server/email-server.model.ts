export interface EmailServer {
  configuration: EmailServerConfiguration;
}

export type EmailServerConfiguration = SmtpConfiguration | AzureConfiguration;

export interface SmtpConfiguration {
  type: 'SmtpConfiguration'
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface AzureConfiguration {
  type: 'AzureConfiguration'
  clientId: string;
  clientSecret: string;
  tenantId: string;
  emailAddress: string;
}
