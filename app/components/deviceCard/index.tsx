import React from 'react';
import NetworkDevice, { ProbeStatus } from '../../utils/NetworkDevice';

type Props = {
  device: NetworkDevice;
};

const DeviceCard: React.FunctionComponent<Props> = ({ device }: Props) => {
  const { name, ip, mac, lastboot, vendor, os, probeStatus, ports } = device;

  return (
    <ul>
      <li>{name}</li>
      <li>{vendor}</li>
      <li>
        {typeof os === 'string'
          ? { os }
          : os?.map(({ name: osName, accuracy }) => (
              // eslint-disable-next-line react/jsx-indent
              <ul key={osName}>
                <li>{osName}</li>
                <li>{accuracy}</li>
              </ul>
            ))}
      </li>
      <li>{ip}</li>
      <li>{mac}</li>
      <li>{lastboot}</li>
      <li>{ProbeStatus[probeStatus]}</li>
      <li>
        Open Ports:
        <ul>
          {ports?.map(({ number, protocol, service }) => (
            <li key={number}>{`${number} (${protocol}): ${service}`}</li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default DeviceCard;
