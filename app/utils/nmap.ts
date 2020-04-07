import sudo from 'sudo-prompt';
import path from 'path';
import { parseString as parseXMLString } from 'xml2js';
import moment from 'moment';
import NetworkDevice, { ProbeStatus } from './NetworkDevice';

const EXEC_OPTS = {
  name: 'Caelirium',
  icns: path.resolve('resources', 'icon.icns')
};

const NMAP_OPTS = [
  '-Pn', // Treat all hosts as online -- skip host discovery,
  '-O', // Enable OS detection
  '-sV', // Probe open ports to determine service/version info
  '-T5', // Set timing template (higher is faster)
  '-oX -' // Output scan in XML
];

const DATE_FORMAT: string | undefined = undefined;
const TIME_FORMAT: string | undefined = undefined;

interface NmapRunRawOutput {
  nmaprun: {
    $: {
      start: string;
      version: string;
    };
    host: {
      $: {
        starttime: string;
        endtime: string;
      };
      address: {
        $: {
          addr: string;
          addrtype: string;
          vendor?: string;
        };
      }[];
      os: {
        osmatch?: {
          $: {
            accuracy: string;
            name: string;
          };
        }[];
      }[];
      ports: {
        port?: {
          $: {
            protocol: string;
            portid: string;
          };
          service: {
            $: {
              name: string;
              servicefp?: string;
            };
          }[];
          state: {
            $: string;
          }[];
        }[];
      }[];
      status: {
        $: {
          state: string;
        };
      }[];
      uptime?: {
        $: {
          seconds: string;
          lastboot: string;
        };
      }[];
    }[];
    runstats: {
      finished: {
        $: {
          elapsed: string;
          exit: string;
        };
      }[];
    }[];
  };
}

interface NmapResults {
  run: {
    time: {
      started: string;
      ended: string;
      elapsed: string;
    };
    version: string;
  };
  devices: NetworkDevice[];
}

const parse = (stdout: string): Promise<NmapResults> =>
  new Promise<NmapRunRawOutput>((resolve, reject) => {
    parseXMLString(stdout, (err, res) => (err ? reject(err) : resolve(res)));
  }).then(results => {
    const { $, host, runstats } = results.nmaprun;
    // Debugging
    // console.dir(results.nmaprun);

    return {
      run: {
        time: {
          started: moment.unix(parseInt($.start, 10)).format(TIME_FORMAT),
          ended: moment().format(TIME_FORMAT),
          elapsed: moment
            .duration(parseFloat(runstats[0].finished[0].$.elapsed), 'seconds')
            .humanize()
        },
        version: $.version
      },
      devices: host.map(({ address, os, ports, status, uptime }) => ({
        name: '?',
        ip:
          address.find(({ $: { addrtype } }) => addrtype.includes('ip'))?.$
            .addr ?? '?',
        mac:
          address.find(({ $: { addrtype } }) => addrtype === 'mac')?.$.addr ??
          '?',
        online: status[0].$.state === 'up',
        lastboot: uptime
          ? moment.unix(parseInt(uptime[0].$.seconds, 10)).format(DATE_FORMAT)
          : undefined,
        vendor: address.find(({ $: { addrtype } }) => addrtype === 'mac')?.$
          .vendor,
        os: os[0].osmatch?.map(({ $: { name, accuracy } }) => ({
          name,
          accuracy: parseInt(accuracy, 10)
        })),
        probeStatus: ProbeStatus.SUCCEEDED,
        ports: ports[0].port?.map(({ $: { protocol, portid }, service }) => ({
          number: parseInt(portid, 10),
          protocol,
          service: service[0].$.name
        }))
      }))
    };
  });

const probeIPs = (ips: string[]): Promise<string> =>
  new Promise((resolve, reject) => {
    sudo.exec(
      `nmap ${ips.join(' ')} ${NMAP_OPTS.join(' ')}`,
      EXEC_OPTS,
      (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }

        if (stderr) {
          return reject(error);
        }

        return resolve(stdout);
      }
    );
  });

export { parse, probeIPs };
