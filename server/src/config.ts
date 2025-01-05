import { existsSync, mkdirSync } from 'fs';
import logger from './logger';

type FirmwareVersion = 'pod3FirmwareReset' | 'newFirmware' | 'remoteDevMode';

interface FirmwareConfig {
  deviceCrtFileCheck: string;
  dacLocation: string;
}

const FIRMWARE_MAP: Record<FirmwareVersion, FirmwareConfig> = {
  remoteDevMode: {
    deviceCrtFileCheck: '',
    dacLocation: '~/free-sleep-database/.sock',
  },
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
  public dbFolder: string;
  public remoteDevMode: boolean;

  private constructor() {
    this.remoteDevMode = process.platform === 'darwin';
    this.firmwareVersion = this.detectFirmware();
    this.firmwareConfig = FIRMWARE_MAP[this.firmwareVersion];
    this.dbFolder = this.remoteDevMode ? '~/free-sleep-database/' : '/home/dac/free-sleep-database/';
    this.initDBFolder();
  }

  private initDBFolder() {
    if (!existsSync(this.dbFolder)) {
      try {
        logger.debug(`Creating DB folder: ${this.dbFolder}`)
        mkdirSync(this.dbFolder, { recursive: true });
      } catch (error) {
        console.error(`Failed to create folder: ${this.dbFolder}`, error);
      }
    } else {
      console.log(`Folder already exists: ${this.dbFolder}`);
    }
  }

  private detectFirmware(): FirmwareVersion {
    // On the pod 3, after the device is firmware reset, the device.crt exists at /deviceinfo/dac.sock
    if (existsSync(FIRMWARE_MAP.pod3FirmwareReset.deviceCrtFileCheck)) {
      return 'pod3FirmwareReset';
    } else if (existsSync(FIRMWARE_MAP.newFirmware.deviceCrtFileCheck)) {
      // On the pod 4 & pod 3 with latest firmware updates, the device.crt exists at /persistent/deviceinfo/dac.sock
      return 'newFirmware';
    }
    if (!this.remoteDevMode) {
      throw new Error('Error - Did not detect device firmware');
    } else {
      return 'remoteDevMode';
    }
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config.getInstance();
