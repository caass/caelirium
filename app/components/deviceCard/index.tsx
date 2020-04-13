import React, { useEffect, useState } from 'react';
import { HelpCircle, Loader, AlertCircle, Server } from 'react-feather';
import NetworkDevice, { ProbeStatus } from '../../utils/NetworkDevice';
import { spin } from '../../styles/_animations.scss';
import { card } from './styles.scss';
import { code } from '../../styles/app.global.scss';

type Props = {
  device: NetworkDevice;
};

const DeviceCard: React.FunctionComponent<Props> = ({ device }: Props) => {
  const { ip, mac, lastboot, vendor, os, probeStatus, ports } = device;
  const [probeStatusIcon, updateProbeStatusIcon] = useState(<Server />);

  const name = device.name === '?' ? `Device at ${ip}` : device.name;

  useEffect(() => {
    switch (probeStatus) {
      case ProbeStatus.NOT_STARTED:
        updateProbeStatusIcon(<HelpCircle />);
        break;
      case ProbeStatus.IN_PROGRESS:
        updateProbeStatusIcon(<Loader className={spin} />);
        break;
      case ProbeStatus.FAILED:
        updateProbeStatusIcon(<AlertCircle />);
        break;
      case ProbeStatus.SUCCEEDED:
        updateProbeStatusIcon(<Server />);
        break;
      default:
        break;
    }
  }, [probeStatus]);

  return (
    <button
      className={`${card} ${code} flex flex-col items-center justify-start transition-colors duration-300 ease-in-out`}
      type="button"
      onClick={() => {
        if (probeStatus === ProbeStatus.FAILED) {
          console.log('probe failed');
        }
      }}
    >
      {probeStatusIcon}
      <pre>{ip}</pre>
    </button>
  );
};

export default DeviceCard;
