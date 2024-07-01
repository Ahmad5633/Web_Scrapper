import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../student/student.entity';
import { CreateStudentDto } from '../student/create-student.dto';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async scrapeData(): Promise<string> {
    const baseUrl = 'https://data.world/datasets/students';
    const totalPages = 5;

    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const pageData = await this.scrapePage(page, baseUrl, currentPage);
        await this.saveStudents(pageData);
      }

      await browser.close();
      return 'Scraping and saving data completed successfully.';
    } catch (error) {
      this.logger.error(`Error scraping data: ${error}`);
      return 'Error occurred during scraping.';
    }
  }

  async getAllStudents(): Promise<Student[]> {
    try {
      return await this.studentRepository.find();
    } catch (error) {
      this.logger.error(`Error fetching students: ${error}`);
      return [];
    }
  }

  private async scrapePage(
    page: puppeteer.Page,
    baseUrl: string,
    currentPage: number,
  ): Promise<any[]> {
    const pageData: any[] = [];

    try {
      await page.goto(`${baseUrl}?page=${currentPage}`, {
        waitUntil: 'networkidle2',
      });

      const studentCards = await page.$$(
        '.Card__card___aSnPt.Card__linked___2yUGm.Card__chrome___viUm2',
      );

      for (const card of studentCards) {
        const title = await card.$eval('.Card__title___2kymQ', (node) =>
          node.textContent.trim(),
        );
        const description = await card.$eval(
          '.Card__subtitle___s5M3Y',
          (node) => node.textContent.trim(),
        );
        const summary = await card.$eval('.Card__bodyText___2S2Q2', (node) =>
          node.textContent.trim(),
        );

        pageData.push({ title, description, summary });
      }
    } catch (error) {
      this.logger.error(`Error scraping page ${currentPage}: ${error}`);
    }

    return pageData;
  }

  private async saveStudents(students: any[]): Promise<void> {
    try {
      const createStudentDtos = students.map((student) => {
        const createStudentDto = new CreateStudentDto();
        createStudentDto.title = student.title;
        createStudentDto.description = student.description;
        createStudentDto.summary = student.summary;
        return createStudentDto;
      });

      await this.studentRepository.save(createStudentDtos);
    } catch (error) {
      this.logger.error(`Error saving students: ${error}`);
    }
  }
}
