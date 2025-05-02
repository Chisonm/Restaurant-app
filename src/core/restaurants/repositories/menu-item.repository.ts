import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MenuItem } from '../entities/menu-item.entity';

@Injectable()
export class MenuItemRepository extends Repository<MenuItem> {
  constructor(private dataSource: DataSource) {
    super(MenuItem, dataSource.createEntityManager());
  }

  async findByRestaurant(restaurantId: number): Promise<MenuItem[]> {
    return this.find({
      where: {
        restaurantId,
        isAvailable: true,
      },
      order: { category: 'ASC', name: 'ASC' },
    });
  }
}