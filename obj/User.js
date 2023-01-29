class User {
  constructor(
    username,
    password,
    roles,
    email,
    desc,
    active,
    isAdmin,
    create,
    update,
  ) {
    this.username = username;
    this.password = password;
    this.email = "";
    this.desc = "desc";
    this.roles = ["Employee"];
    this.create = new Date();
    this.update = new Date();
    this.isAdmin = false;
    this.active = true;
  }
}

module.exports = {
  User,
};
