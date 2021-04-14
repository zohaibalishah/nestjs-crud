import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}
  // private readonly items: Item[] = [
  //   {
  //     id: '123',
  //     name: 'item 1',
  //     description: 'decrription 1',
  //     qty: 20,
  //   },
  //   {
  //     id: '456',
  //     name: 'item 2',
  //     description: 'decrription 2',
  //     qty: 10,
  //   },
  // ];

  async findAllItems(): Promise<Item[]> {
    return await this.itemModel.find({});
  }
  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findById(id);
  }

  async createItem(
    name: string,
    description: string,
    qty: number,
  ): Promise<Item> {
    const newItem = new this.itemModel({ name, description, qty });
    return await newItem.save();
  }
  async update(id: string, updateItemDto: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, updateItemDto);
  }
  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }
}
