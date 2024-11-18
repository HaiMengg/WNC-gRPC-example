import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize';
import { Timestamp } from 'google/protobuf/timestamp.pb';

@Table({
  tableName: 'actor',
  timestamps: false,
})
export class ActorModel extends Model {
  @Column({
    type: DataTypes.SMALLINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  actor_id: string

  @Column({
    type: DataTypes.STRING(45),
    allowNull: false,
  })
  first_name: string

  @Column({
    type: DataTypes.STRING(45),
    allowNull: false,
  })
  last_name: string

  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  last_update: Timestamp

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
