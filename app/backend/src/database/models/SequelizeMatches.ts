import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

class SequelizeMatches extends Model<
InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>
> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

export default SequelizeMatches;
