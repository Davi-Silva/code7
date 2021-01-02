import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        website: {
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
    this.hasOne(models.Address, { foreignKey: 'user_id', as: 'address' });
    this.hasOne(models.Company, { foreignKey: 'user_id', as: 'company' });
    this.hasMany(models.Debt, { foreignKey: 'user_id', as: 'debt' });
  }
}

export default User;
