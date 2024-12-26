import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';
import { Users } from './users';
import { FavoriteTypes } from './favoriteType';
import { Tracks } from './tracks';
import { Albums } from './albums';
import { Artists } from './artists';

export interface FavoriteAttributes {
  favourite_id: string;
  user_id: string;
  tenant_id: string;
  item_id: string;
  type: number;
  created_at: Date;
  updated_at?: Date;
}

export type FavoriteCreationAttributes = Optional<FavoriteAttributes, 'favourite_id' | 'created_at'>;

interface FavoriteInstance
  extends Model<FavoriteAttributes, FavoriteCreationAttributes>,
    FavoriteAttributes {}

export const Favorites = db.define<FavoriteInstance>(
  'favorites',
  {
    favourite_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4,
      defaultValue: db.literal('DEFAULT')
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUIDV4
    },
    tenant_id: {
      allowNull: false,
      type: DataTypes.UUIDV4
    },
    item_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
    type: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
);

Favorites.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
Favorites.belongsTo(FavoriteTypes, { foreignKey: 'type', as: 'favorite_type' });

Favorites.belongsTo(Tracks, { foreignKey: 'item_id', as: 'track' });
Favorites.belongsTo(Albums, { foreignKey: 'item_id', as: 'album' });
Favorites.belongsTo(Artists, { foreignKey: 'item_id', as: 'artist' });
