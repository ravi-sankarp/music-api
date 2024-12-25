import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';

export interface FavoriteTypeAttributes {
  id: number;
  name: string;
  description?: string;
}

type FavoriteTypeCreationAttributes = Optional<FavoriteTypeAttributes, 'id'>;

interface FavoriteTypeInstance
  extends Model<FavoriteTypeAttributes, FavoriteTypeCreationAttributes>,
    FavoriteTypeAttributes {}

export const FavoriteTypes = db.define<FavoriteTypeInstance>(
  'favorite_types',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
      unique: true
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
);
