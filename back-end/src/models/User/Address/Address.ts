import { DataTypes, Model } from 'sequelize';

class Address extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        suite: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        zip_code: {
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasOne(models.AddressGeo, { foreignKey: 'address_id', as: 'geo' });
  }
}

export default Address;
