import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async findCart(userId: number): Promise<Order | null> {
    return this.findOne({
      where: {
        userId,
        status: OrderStatus.CART,
      },
      relations: ['orderItems', 'orderItems.menuItem'],
    });
  }

  async findOrderWithDetails(id: number): Promise<Order | null> {
    return this.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.menuItem', 'paymentMethod', 'user'],
    });
  }

  async findUserOrders(userId: number): Promise<Order[]> {
    return this.find({
      where: { userId },
      relations: ['orderItems', 'orderItems.menuItem',
        'paymentMethod', 'user'],
      order: { createdAt: 'DESC' },
    });
  }
    async findAllOrders(): Promise<Order[]> {
      return this.find({
        relations: ['orderItems', 'orderItems.menuItem', 'paymentMethod', 'user'],
        order: { createdAt: 'DESC' },
      });
    }
  async findOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return this.find({
      where: { status },
      relations: ['orderItems', 'orderItems.menuItem', 'paymentMethod', 'user'],
      order: { createdAt: 'DESC' },
    });
  }
  async findOrdersByUser(user: User): Promise<Order[]> {
    return this.find({
      where: { user },
      relations: ['orderItems', 'orderItems.menuItem', 'paymentMethod'],
      order: { createdAt: 'DESC' },
    });
  }
  async findOrdersByPaymentMethod(paymentMethodId: number): Promise<Order[]> {
    return this.find({
      where: { paymentMethodId },
      relations: ['orderItems', 'orderItems.menuItem', 'paymentMethod', 'user'],
      order: { createdAt: 'DESC' },
    });
  }
} 