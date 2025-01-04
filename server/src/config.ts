import { existsSync } from 'fs';

type FirmwareVersion = 'pod3FirmwareReset' | 'newFirmware';

interface FirmwareConfig {
  deviceCrtFileCheck: string;
  dacLocation: string;
}

const FIRMWARE_MAP: Record<FirmwareVersion, FirmwareConfig> = {
  pod3FirmwareReset: {
    deviceCrtFileCheck: '/deviceinfo/device.key',
    dacLocation: '/deviceinfo/dac.sock',
  },
  newFirmware: {
    deviceCrtFileCheck: '/persistent/deviceinfo/device.key',
    dacLocation: '/persistent/deviceinfo/dac.sock',
  },
};

class Config {
  private static instance: Config;
  public firmwareVersion: FirmwareVersion;
  public firmwareConfig: FirmwareConfig;

  private constructor() {
    this.firmwareVersion = this.detectFirmware();
    this.firmwareConfig = FIRMWARE_MAP[this.firmwareVersion];
  }

  private detectFirmware(): FirmwareVersion {
    // On the pod 3, after the device is firmware reset, the device.crt exists at /deviceinfo/dac.sock
    if (existsSync(FIRMWARE_MAP.pod3FirmwareReset.deviceCrtFileCheck)) {
      return 'pod3FirmwareReset';
    } else if (existsSync(FIRMWARE_MAP.newFirmware.deviceCrtFileCheck)) {
      // On the pod 4 & pod 3 with latest firmware updates, the device.crt exists at /persistent/deviceinfo/dac.sock
      return 'newFirmware';
    }
    throw new Error('Error - Did not detect device firmware');
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config.getInstance();
