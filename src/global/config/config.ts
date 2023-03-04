export class ConfigPrototype {
  protected getString(name: string, defaultValue = ''): string {
    const value = process.env[name];
    return value ? value.trim() : defaultValue;
  }

  protected getStringArray(name: string, defaultValue = []): string[] {
    const value = process.env[name];
    return value ? value.split(',').map(v => v.trim()) : defaultValue;
  }

  protected getNumber(name: string, defaultValue: number): number {
    const value = Number(process.env[name]);
    return isFinite(value) ? value : defaultValue;
  }

  protected getBoolean(name: string): boolean {
    const value = process.env[name];
    return !!value && ['true', 'yes', 't', 'y', '1', 'on'].includes(value.toLowerCase());
  }
}

class GlobalConfigPrototype extends ConfigPrototype {
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

export const GlobalConfig = new GlobalConfigPrototype();
