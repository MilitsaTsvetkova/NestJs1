import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private repository: MessagesRepository) {}
  findOne(id: string) {
    return this.repository.findOne(id);
  }

  findAll() {
    return this.repository.findAll();
  }
  createMessage(content: string) {
    return this.repository.createMessage(content);
  }
}
