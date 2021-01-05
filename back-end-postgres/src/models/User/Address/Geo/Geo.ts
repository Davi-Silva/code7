import { DataTypes, Model } from 'sequelize';

class AddressGeo extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        address_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        lat: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lng: {
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
    this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'geo' });
  }
}

export default AddressGeo;
