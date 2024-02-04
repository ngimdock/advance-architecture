export class AlarmSeverity {
  constructor(public value: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL') {}

  aquals(security: AlarmSeverity) {
    return this.value === security.value;
  }

  toJSON() {
    return this.value;
  }
}
