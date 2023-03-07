const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAll() {
    return this.database.query(`select firstname, lastname, email, city, language, hashedPassword from  ${this.table}`);
  }

  insert(user) {
    return this.database.query(`insert into ${this.table} (firstname, lastname, email, city, language, hashedPassword) values (?)`, [
      user.firstname,
      user.lastname,
      user.email,
      user.city,
      user.language,
      user.hashedPassword,
    ]
    );
  }
}

module.exports = UserManager;
