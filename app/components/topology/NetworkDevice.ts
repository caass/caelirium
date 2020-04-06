import { IDevice } from 'local-devices';

export enum ProbeStatus {
  NOT_STARTED,
  IN_PROGRESS,
  FAILED,
  SUCCEEDED
}

export default interface NetworkDevice extends IDevice {
  ports: string[] | undefined;
  manufacturer: string | undefined;
  os: string | { name: string; likelihood: number }[] | undefined;
  probeStatus: ProbeStatus;
  probeError: Error | undefined;
}
