import { PrismaClient } from '@prisma/client';

export class BookService {
  constructor(private prismaClient: PrismaClient) {}

  selectAll = async () => {
    return await this.prismaClient.book.findMany({});
  };

  create = async (title: string, description: string, price: string) => {
    return await this.prismaClient.book.create({
      data: {
        description: description,
        title: title,
        price: price,
      },
    });
  };

  delete = async (id: string) => {
    return await this.prismaClient.book.delete({ where: { id: id } });
  };

  update = async (
    id: string,
    title?: string | undefined,
    description?: string | undefined,
    price?: string | undefined,
  ) => {
    return await this.prismaClient.book.update({
      where: { id: id },
      data: {
        description: description,
        title: title,
        price: price,
      },
    });
  };
}
