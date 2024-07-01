import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  summary: string;
}
