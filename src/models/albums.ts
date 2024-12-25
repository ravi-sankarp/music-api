import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';
import { Users } from './users';
import { Artists } from './artists';

export interface AlbumAttributes {
  album_id: string;
  name: string;
  artist_id: string;
  year: number;
  hidden: boolean;
  created_at: Date;
  updated_at?: Date;
  created_by: string;
  tenant_id: string;
  updated_by?: string;
}

export type AlbumCreationAttributes = Optional<AlbumAttributes, 'album_id' | 'created_at' | 'updated_at'>;

export type AlbumUpdationAttributes = Partial<
  Optional<AlbumAttributes, 'album_id' | 'created_at' | 'created_by' | 'tenant_id'>
>;


interface AlbumInstance extends Model<AlbumAttributes, AlbumCreationAttributes>, AlbumAttributes {}

export const Albums = db.define<AlbumInstance>(
  'albums',
  {
    album_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4,
      defaultValue: db.literal('DEFAULT')
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    artist_id: {
      allowNull: false,
      type: DataTypes.UUIDV4
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    hidden: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    created_by: {
      allowNull: false,
      type: DataTypes.UUIDV4
    },
    tenant_id: {
      allowNull: false,
      type: DataTypes.UUIDV4
    },
    updated_by: {
      allowNull: true,
      type: DataTypes.UUIDV4
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
);

Albums.belongsTo(Artists, { foreignKey: 'artist_id', as: 'artist' });
Albums.belongsTo(Users, { foreignKey: 'created_by', as: 'creator' });
Albums.belongsTo(Users, { foreignKey: 'updated_by', as: 'updator' });
