const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme-schools',
  { logging: false }
);

const Student = conn.define('student', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  firstName: {
    type: Sequelize.STRING,
    validation: {
      notNull: true,
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    validation: {
      notNull: true,
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    validation: {
      notNull: true,
      notEmpty: true,
      unique: true,
      isEmail: true,
    },
  },
  gpa: {
    type: Sequelize.DECIMAL,
    validation: {
      notNull: true,
      notEmpty: true,
    },
  },
});
const School = conn.define('school', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    validation: {
      notNull: true,
      notEmpty: true,
    },
  },
  imageURL: {
    type: Sequelize.STRING,
    validation: {
      notNull: true,
      notEmpty: true,
    },
  },
});

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await Student.create({
    firstName: 'Juan',
    lastName: 'Hernan',
    email: 'juan@hernan.com',
    gpa: 3.5,
  });
  await Student.create({
    firstName: 'Marco',
    lastName: 'Polo',
    email: 'marco@polo.net',
    gpa: 3.67,
  });
  await Student.create({
    firstName: 'Ciel',
    lastName: 'Lo',
    email: 'ciel@lo.com',
    gpa: 3.8,
  });
  await Student.create({
    firstName: 'Jimmy',
    lastName: 'Cadel',
    email: 'jimmy@cadel.com',
    gpa: 3.4,
  });
  await Student.create({
    firstName: 'Cody',
    lastName: 'B',
    email: 'cody@b.com',
    gpa: 4.0,
  });
  await School.create({
    name: 'College of Winterhold',
    imageURL:
      'https://th05.deviantart.net/fs71/PRE/i/2013/154/0/0/the_college_of_winterhold_by_thespiritofthewoods-d67p24x.jpg',
  });
  await School.create({
    name: 'X-Mansion',
    imageURL:
      'https://vignette.wikia.nocookie.net/marvelmovies/images/2/27/X-Mansion.jpg/revision/latest?cb=20110417120712',
  });
  await School.create({
    name: 'MIT',
    imageURL:
      'http://news.mit.edu/sites/mit.edu.newsoffice/files/styles/news_article_image_top_slideshow/public/images/2018/MIT-Computer-Announce-01_0.jpg?itok=nDI5_kh0',
  });
  await School.create({
    name: 'Harvard',
    imageURL:
      'https://www.timeshighereducation.com/sites/default/files/styles/the_breaking_news_image_style/public/harvard-university-campus.jpg?itok=cKc44_JK',
  });
  await School.create({
    name: 'Stanford',
    imageURL:
      'https://www.collegeconsensus.com/wp-content/uploads/2016/12/intro_about-800x532.jpg',
  });
};
module.exports = {
  syncAndSeed,
  models: {
    Student,
    School,
  },
};
