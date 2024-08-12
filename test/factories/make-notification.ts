import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makeprismaNotification(data: Partial<NotificationProps> = {}) {
    const notification = makeNotification(data);
    //TODO: create enitity notification in schema prisma
    return notification;
  }
}

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(12),
      ...override,
    },
    id,
  );

  return notification;
}
