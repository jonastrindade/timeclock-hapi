const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('timeclock', 'bduser', 'bduser', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// teste da conexao com o banco
// sequelize
// .authenticate()
// .then(() => {
//     console.log('Connection has been established successfully.');
// })
// .catch (error => {
//     console.error('Unable to connect to the database:', error);
// });

const Horarios = sequelize.define('horarios', {
  id: {type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4},
  inicio: Sequelize.DATE,
  fim: Sequelize.DATE,
  inseridoPor: {type: Sequelize.STRING, allowNull: true},
  validadoPor: {type: Sequelize.STRING, allowNull: true},
  situacao: {
    type: Sequelize.ENUM,
    values: ['aguardando', 'aprovado', 'rejeitado'],
  }
});

sequelize.sync();

module.exports.save = async (input) => {
  return await Horarios.create({
    situacao: 'aguardando',
    inicio: input.inicio,
    fim: input.fim,
    inseridoPor: input.username
  });

};

module.exports.findAll = async () => {
  return await Horarios.findAll({
    order: [['createdAt', 'DESC']]
  });

};

module.exports.update = async (input) => {
  
  const horario = await Horarios.findOne({
    where: {
      id: input.id
    }
  });
  
  return await horario.update({
    situacao: input.situacao,
    validadoPor: input.validador
  });
};