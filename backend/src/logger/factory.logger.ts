import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';
import { LoggerSupport } from '../app.config.provider';

export function factoryLogger(logger: LoggerSupport) {
    switch(logger) {
        case LoggerSupport.dev: 
          return (new DevLogger());
        case LoggerSupport.json: 
          return (new JsonLogger());
        case LoggerSupport.tskv: 
          return (new TskvLogger());
      }
    return undefined;
}
