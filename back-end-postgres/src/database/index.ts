import { Sequelize } from 'sequelize';
import { success } from '@utils/logger/logger';

import dbConfig from '@config/database';

import Admin from '@models/Admin/Admin';
import User from '@models/User/User';
import Address from '@models/User/Address/Address';
import AddressGeo from '@models/User/Address/Geo/Geo';
import Company from '@models/User/Company/Company';
import Debt from '@models/User/Debt/Debt';

const connection = new Sequelize(dbConfig[process.env.NODE_ENV]);

Admin.init(connection);
User.init(connection);
Address.init(connection);
AddressGeo.init(connection);
Company.init(connection);
Debt.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
AddressGeo.associate(connection.models);
Company.associate(connection.models);
Debt.associate(connection.models);

success('Postgres database successfully set up and connected.');

export default connection;
