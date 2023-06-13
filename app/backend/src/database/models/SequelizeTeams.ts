import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

class SequelizeTeams extends Model<
InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>
> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

export default SequelizeTeams;
