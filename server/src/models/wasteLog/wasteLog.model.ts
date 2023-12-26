import { Model, DataTypes, Optional } from 'sequelize';
import { IWasteLog } from '../../interfaces/wasteLog.interface';
import sequelize from '..';

interface WasteLogCreationAttributes extends Optional<IWasteLog, 'id'> {};

interface WasteLogInstance extends Model<IWasteLog, WasteLogCreationAttributes>, IWasteLog {
  createdAt?: Date;
  updatedAt?: Date;
}

