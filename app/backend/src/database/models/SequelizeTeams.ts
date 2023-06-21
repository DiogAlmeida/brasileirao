import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';
import SequelizeMatches from './SequelizeMatches';

class SequelizeTeams extends Model<
InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>
> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizeTeams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

SequelizeTeams.hasMany(
  SequelizeMatches,
  { foreignKey: 'homeTeamId', as: 'homeTeam' },
);
SequelizeTeams.hasMany(
  SequelizeMatches,
  { foreignKey: 'awayTeamId', as: 'awayTeam' },
);

SequelizeMatches.belongsTo(SequelizeTeams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatches.belongsTo(SequelizeTeams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default SequelizeTeams;
