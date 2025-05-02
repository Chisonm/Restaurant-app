import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';

@Injectable()
export class RestaurantRepository extends Repository<Restaurant> {
  constructor(private dataSource: DataSource) {
    super(Restaurant, dataSource.createEntityManager());
  }

  async findAllActive(): Promise<Restaurant[]> {
    return this.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findOneWithMenuItems(id: number): Promise<Restaurant | null> {
    return this.findOne({
      where: { id, isActive: true },
      relations: ['menuItems'],
    });
  }
}