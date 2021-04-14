import {
  Get,
  Post,
  Put,
  Delete,
  Controller,
  Body,
  Param,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}
  @Get()
  async findAllItems():Promise< Item[]> {
    return this.itemService.findAllItems();
  }

  @Get(':id')
  //   findOneItem(@Param() param): string {
  // return param.id
  // }
  async findOneItem(@Param('id') id):Promise< Item> {
    return this.itemService.findOne(id)
  }
  @Post()
  async createItem(@Body() createItemDto: CreateItemDto):Promise<Item>  {
    return this.itemService.createItem(
      createItemDto.name,
      createItemDto.description,
      createItemDto.qty
    )
  }
  @Delete(':id')
  async deleteItem(@Param('id') id):Promise< Item>  {
    return this.itemService.delete(id)
  }
  @Put(':id')
  async updateItem(@Body() updateItemDto: Item, @Param('id') id):Promise< Item>  {
    return this.itemService.update(id,updateItemDto)

  }
}
