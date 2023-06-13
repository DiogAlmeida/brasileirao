import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

class SequelizeUsers extends Model<
InferAttributes<SequelizeUsers>,
InferCreationAttributes<SequelizeUsers>
> {
  declare id: CreationOptional<number>;

  declare username: string;

  declare role: string;

  declare email: string;

  declare password: string;
}

export default SequelizeUsers;
