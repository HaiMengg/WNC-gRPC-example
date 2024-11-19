import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize';
import { Timestamp } from 'google/protobuf/timestamp.pb';
import { IActor } from 'src/proto/actor.pb';

@Table({
  tableName: 'actor',
  timestamps: false,
})
export class Actor extends Model implements IActor {
  @Column({
    field: 'actor_id',
    type: DataTypes.SMALLINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  actorId: number

  @Column({
    field: 'first_name',
    type: DataTypes.STRING(45),
    allowNull: false,
  })
  firstName: string

  @Column({
    field: 'last_name',
    type: DataTypes.STRING(45),
    allowNull: false,
  })
  lastName: string

  @Column({
    field: 'last_update',
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  lastUpdate: Timestamp
}

// const Actor = sequelize.define('Actor', {
//   actor_id: {
//     type: DataTypes.SMALLINT.UNSIGNED,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   first_name: {
//     type: DataTypes.STRING(45),
//     allowNull: false,
//   },
//   last_name: {
//     type: DataTypes.STRING(45),
//     allowNull: false,
//   },
//   last_update: {
//     type: 'TIMESTAMP',
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   tableName: 'actor',
//   timestamps: false,
// });

// export { Actor }
