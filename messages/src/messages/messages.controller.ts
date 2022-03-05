import {
  Body,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}
  @Get()
  listMessages() {
    return this.service.findAll();
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.service.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  @Post()
  // @Header('tenantId', tenantId)
  createMessage(@Body() payload: CreateMessageDto) {
    const { content } = payload;
    return this.service.createMessage(content);
  }
}
