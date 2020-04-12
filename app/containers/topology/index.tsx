/* eslint-disable promise/always-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Map, Search, XCircle, BarChart2, Loader } from 'react-feather';

import find from 'local-devices';

import Container, { ContainerProps } from '../../components/container';
import DeviceCard from '../../components/deviceCard';
import Button from '../../components/button';

import NetworkDevice, { ProbeStatus } from '../../utils/NetworkDevice';
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
  selectProbingDevices,
  updateLastRun,
  selectLastRun
} from './slice';

const Topology: React.FunctionComponent<ContainerProps> = ({
  next,
  prev
}: ContainerProps) => {
  const devices = useSelector(selectDevices);
  const isScanning = useSelector(selectScanningNetwork);
  const isProbing = useSelector(selectProbingDevices);
  const lastRun = useSelector(selectLastRun);
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

        const failedProbes: NetworkDevice[] = devices
          .filter(
            ({ ip: potentiallyUnprobedIP }) =>
              !probedDevices.map(({ ip }) => ip).includes(potentiallyUnprobedIP)
          )
          .map(d => ({
            name: d.name,
            ip: d.ip,
            mac: d.mac,
            online: d.online,
            lastboot: d.lastboot,
            vendor: d.vendor,
            os: d.os,
            probeStatus: ProbeStatus.FAILED,
            ports: d.ports
          }));

        dispatch(stopProbingDevices(failedProbes));

        dispatch(updateLastRun(run.time));
      })
      .catch(err => {
        // TODO: Handle errors lol
        throw err;
      });
  };

  useEffect(() => {
    if (!lastRun) {
      return;
    }
    console.log(`Run completed in ${lastRun.elapsed}`);
  }, [lastRun]);

  return (
    <Container
      title="Topology"
      header={{
        icon: <Map />
      }}
      next={next}
      prev={prev}
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
