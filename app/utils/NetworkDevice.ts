import { IDevice } from 'local-devices';

export enum ProbeStatus {
  NOT_STARTED,
  IN_PROGRESS,
  FAILED,
  SUCCEEDED
}

export default interface NetworkDevice extends IDevice {
  online?: boolean;
  lastboot?: string;
  vendor?: string;
  os?: string | { name: string; accuracy: number }[];
  probeStatus: ProbeStatus;
  ports?: {
    number: number;
    protocol: string;
    service: string;
  }[];
}
