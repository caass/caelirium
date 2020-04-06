import React from 'react';
import NetworkDevice from '../NetworkDevice';

type Props = {
  device: NetworkDevice;
};

const DeviceCard = ({ device }: Props) => {
  const { name, manufacturer, os, ip, mac, ports } = device;

  return (
    <ul>
      <li>{name}</li>
      <li>{manufacturer}</li>
      <li>{os}</li>
      <li>{ip}</li>
      <li>{mac}</li>
      <li>
        Open Ports:
        <ul>
          {ports?.map(p => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default DeviceCard;
