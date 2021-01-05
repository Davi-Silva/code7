import { DataTypes, Model } from 'sequelize';

class Debt extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        reason: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'debt' });
  }
}

export default Debt;
