import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';
import { Users } from './users';

export interface ArtistAttributes {
  artist_id: string;
  name: string;
  grammy: number;
  hidden: boolean;
  created_at: Date;
  updated_at?: Date;
  created_by: string;
  tenant_id: string;
  updated_by?: string;
}

export type ArtistCreationAttributes = Optional<
  ArtistAttributes,
  'artist_id' | 'created_at' | 'updated_at'
>;

export type ArtistUpdationAttributes = Partial<
  Optional<ArtistAttributes, 'artist_id' | 'created_at' | 'created_by' | 'tenant_id'>
>;

interface ArtistInstance
  extends Model<ArtistAttributes, ArtistCreationAttributes>,
    ArtistAttributes {}

export const Artists = db.define<ArtistInstance>(
  'artists',
  {
    artist_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4,
      defaultValue: db.literal('DEFAULT')
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    grammy: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
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
      type: DataTypes.UUIDV4,
      references: {
        model: Users,
        key: 'user_id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
);

Artists.belongsTo(Users, { foreignKey: 'created_by', as: 'creator' });
Artists.belongsTo(Users, { foreignKey: 'updated_by', as: 'updator' });
