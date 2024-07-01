import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperModule } from './scrapper/scrapper.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Ahmad@5633',
      database: 'scrapedData',
      autoLoadEntities: true,
      synchronize: false,
    }),
    ScraperModule,
  ],
})
export class AppModule {}
