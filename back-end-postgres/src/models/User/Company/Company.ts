import { DataTypes, Model } from 'sequelize';

class Company extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        catch_phrase: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bs: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
      },
    );
  }

  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'company' });
  }
}

export default Company;
