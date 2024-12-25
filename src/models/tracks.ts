import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';
import { Users } from './users';
import { Albums } from './albums';
import { Tenants } from './tenants';

export interface TrackAttributes {
  track_id: string;
  name: string;
  album_id: string;
  artist_id: string;
  duration: number;
  hidden: boolean;
  created_at: Date;
  updated_at?: Date;
  created_by: string;
  tenant_id: string;
  updated_by?: string;
}

export type TrackCreationAttributes = Optional<
  TrackAttributes,
  'track_id' | 'created_at' | 'updated_at'
>;

export type TrackUpdationAttributes = Partial<
  Optional<TrackAttributes, 'track_id' | 'created_at' | 'updated_at'>
>;

interface TrackInstance extends Model<TrackAttributes, TrackCreationAttributes>, TrackAttributes {}

export const Tracks = db.define<TrackInstance>(
  'tracks',
  {
    track_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4,
      defaultValue: db.literal('DEFAULT')
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    album_id: {
      allowNull: false,
      type: DataTypes.UUIDV4
    },
    artist_id: {
      allowNull: false,
      type: DataTypes.UUIDV4
    },
    duration: {
      allowNull: false,
      type: DataTypes.FLOAT
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

Tracks.belongsTo(Tenants, { foreignKey: 'tenant_id', as: 'tenant' });
Tracks.belongsTo(Albums, { foreignKey: 'album_id', as: 'album' });
Tracks.belongsTo(Users, { foreignKey: 'created_by', as: 'creator' });
Tracks.belongsTo(Users, { foreignKey: 'updated_by', as: 'updator' });
