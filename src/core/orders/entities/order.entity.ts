import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, AfterLoad, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';
import { PaymentMethod } from '../../payments/entities/payment-method.entity';

export enum OrderStatus {
  CART = 'cart',
  PLACED = 'placed',
  PROCESSING = 'processing',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CART,
  })
  status: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  deliveryFee: number;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { 
    cascade: true,
    eager: true 
  })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  paymentMethodId: number;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.orders, { nullable: true })
  @JoinColumn({ name: 'paymentMethodId' })
  paymentMethod: PaymentMethod;

  // Method to recalculate total based on items
  recalculateTotal(): void {
    const itemsTotal = this.orderItems?.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    ) || 0;
    
    // Calculate tax (assuming 10% tax rate)
    this.tax = Number((itemsTotal * 0.1).toFixed(2));
    
    // Default delivery fee (can be adjusted based on business rules)
    this.deliveryFee = itemsTotal > 0 ? 5.00 : 0;
    
    // Calculate total with tax and delivery fee
    this.totalAmount = Number((itemsTotal + this.tax + this.deliveryFee).toFixed(2));
  }

  @AfterLoad()
  @BeforeInsert()
  @BeforeUpdate()
  updateTotalAmount(): void {
    if (this.orderItems?.length) {
      this.recalculateTotal();
    }
  }

  // Business logic methods
  canCancel(): boolean {
    return this.status === OrderStatus.PLACED;
  }

  canCheckout(): boolean {
    return this.status === OrderStatus.CART && this.orderItems?.length > 0;
  }
}