const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(id) {
    return this.database.query(
      `select firstname, lastname, email, city, language from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(
      `select firstname, lastname, email, city, language from  ${this.table}`
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, city, language, hashedPassword) values (?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.city,
        user.language,
        user.hashedPassword,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.city,
        user.language,
        user.hashedPassword,
        user.id,
      ]
    );
  }
}

module.exports = UserManager;
