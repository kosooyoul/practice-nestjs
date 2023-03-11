import { ConfigPrototype } from '@/common/config/config';

class AuoiConfigPrototype extends ConfigPrototype {
  get NODE_ENV(): string {
    return this.getString('NODE_ENV', 'local').toLowerCase();
  }
  get APP_NAME(): string {
    return this.getString('APP_NAME', 'Unknown');
  }
  get APP_TITLE(): string {
    return this.getString('APP_TITLE', 'Unknown');
  }
  get APP_DESCRIPTION(): string {
    return this.getString('APP_DESCRIPTION');
  }
  get APP_VERSION(): string {
    return this.getString('APP_VERSION', '0.0.0');
  }
  get SERVER_PORT(): number {
    return this.getNumber('SERVER_PORT', 3000);
  }
  get PLAYGROUND_ENABLED(): boolean {
    return this.getBoolean('PLAYGROUND_ENABLED');
  }
}

export const AuoiConfig = new AuoiConfigPrototype();
