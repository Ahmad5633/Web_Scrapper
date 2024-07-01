import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scrapper.service';
import { Student } from '../student/student.entity';

@Controller('students')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.scraperService.getAllStudents();
  }

  @Get('scrape')
  async scrapeAndSaveData(): Promise<string> {
    return this.scraperService.scrapeData();
  }
}
