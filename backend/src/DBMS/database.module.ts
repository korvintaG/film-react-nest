import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { configProvider, DBMSSupport } from '../app.config.provider';
import { isInstance } from '../utils/utils';

@Module({})
export class DBMSModule {
  static forRoot(): DynamicModule {
    const importArr = [];
    const databaseDriver = configProvider.useValue.database.driver;
    console.log(`Try starting ${databaseDriver} connection`);
    if (!isInstance(databaseDriver, DBMSSupport))
      throw new Error(`${databaseDriver} не поддерживается!`);
    if (databaseDriver === DBMSSupport.POSTGRESQL)
      importArr.push(
        TypeOrmModule.forRootAsync({
          useFactory: () => {
            return {
              type: 'postgres',
              host: configProvider.useValue.database.url,
              port: configProvider.useValue.database.port,
              username: configProvider.useValue.database.username,
              password: configProvider.useValue.database.password,
              database: configProvider.useValue.database.databaseName,
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: true,
            };
          },
        }),
      );
    else if (databaseDriver === DBMSSupport.MONGODB)
      importArr.push(
        MongooseModule.forRootAsync({
          useFactory: () => ({ uri: configProvider.useValue.database.url }),
        }),
      );

    return {
      module: DBMSModule,
      imports: importArr,
    };
  }
}
