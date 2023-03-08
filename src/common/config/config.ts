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
