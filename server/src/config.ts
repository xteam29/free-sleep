import { existsSync } from 'fs';

type FirmwareVersion = 'pod3FirmwareReset' | 'newFirmware';

interface FirmwareConfig {
  dacLocation: string;
}

const FIRMWARE_MAP: Record<FirmwareVersion, FirmwareConfig> = {
  pod3FirmwareReset: {
    dacLocation: '/deviceinfo/dac.sock',
  },
  newFirmware: {
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
    if (existsSync(FIRMWARE_MAP.pod3FirmwareReset.dacLocation)) {
      return 'pod3FirmwareReset';
    } else if (existsSync(FIRMWARE_MAP.newFirmware.dacLocation)) {
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
