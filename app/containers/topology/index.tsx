/* eslint-disable promise/always-return */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Map, Search, XCircle, BarChart2, Loader } from 'react-feather';

import find from 'local-devices';

import Container from '../../components/container';
import DeviceCard from '../../components/deviceCard';
import Button from '../../components/button';

import { ProbeStatus } from '../../utils/NetworkDevice';
import { parse as parseNmapResults, probeIPs } from '../../utils/nmap';

import { scanWrapper } from './styles.scss';
import { spin } from '../../styles/_animations.scss';

import {
  selectDevices,
  startScanningNetwork,
  stopScanningNetwork,
  addDevices,
  startProbingDevices,
  clearDevices,
  stopProbingDevices,
  selectScanningNetwork,
  selectProbingDevices
} from './slice';

const Topology: React.FunctionComponent = () => {
  const devices = useSelector(selectDevices);
  const isScanning = useSelector(selectScanningNetwork);
  const isProbing = useSelector(selectProbingDevices);
  const dispatch = useDispatch();

  const lightScan = () => {
    dispatch(startScanningNetwork());
    find()
      .then(foundDevices => {
        dispatch(stopScanningNetwork(null));
        dispatch(
          addDevices(
            foundDevices.map(({ name, ip, mac }) => ({
              name,
              ip,
              mac,
              ports: undefined,
              manufacturer: undefined,
              os: undefined,
              probeStatus: ProbeStatus.NOT_STARTED,
              probeError: undefined
            }))
          )
        );
      })
      .catch(err => {
        dispatch(stopScanningNetwork(err));
      });
  };

  const deepScan = () => {
    const devicesToProbe = devices
      .filter(({ probeStatus }) => probeStatus === ProbeStatus.NOT_STARTED)
      .map(({ ip }) => ip);

    if (devicesToProbe.length === 0) {
      return;
    }

    dispatch(startProbingDevices(devicesToProbe));
    probeIPs(devicesToProbe)
      .then(parseNmapResults)
      .then(({ run, devices: probedDevices }) => {
        // Debugging
        // console.log(run);
        // console.dir(probedDevices);
        dispatch(stopProbingDevices(probedDevices));
      })
      .catch(err => {
        // TODO: Handle errors lol
        throw err;
      });
  };

  return (
    <Container
      title="Topology"
      header={{
        icon: <Map />
      }}
    >
      <div
        className={`${scanWrapper} flex flex-row justify-center items-baseline`}
      >
        <Button
          icon={isScanning ? <Loader className={spin} /> : <BarChart2 />}
          text="Scan Network"
          onClick={lightScan}
        />
        {devices.length > 0 ? (
          <>
            <Button
              icon={isProbing ? <Loader className={spin} /> : <Search />}
              text="Inspect Devices"
              onClick={deepScan}
            />
            <Button
              icon={<XCircle />}
              text="Clear Devices"
              onClick={() => dispatch(clearDevices())}
              buttonType="warning"
            />
          </>
        ) : (
          ''
        )}
      </div>
      <div>
        <ol>
          {devices.map(d => (
            <li key={d.ip}>
              <DeviceCard device={d} />
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
};

export default Topology;
