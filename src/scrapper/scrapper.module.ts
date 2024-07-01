import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperService } from './scrapper.service';
import { ScraperController } from './scrapper.controller';
import { Student } from '../student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
