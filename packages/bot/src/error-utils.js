/* eslint max-classes-per-file: 0 */ 
export class EnvironmentError extends Error {
  constructor(message) {
    super(`${Date.now()}: ${message}`);
    this.name = 'EnvironmentError';
  }
}
export class RequestHandlerError extends Error {
  constructor(message) {
    super(`${Date.now()}: ${message}`);
    this.name = 'RequestHandlerError';
  }
}
export class WhitelistedChannelError extends Error {
  constructor(message) {
    super(`${Date.now()}: ${message}`);
    this.name = 'WhitelistedChannelError';
  }
}