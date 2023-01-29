class Note {
  constructor(userid, title, text, desc, completed) {
    this.userid = userid;
    this.title = title;
    this.text = text;
    this.desc = desc;
    this.roles = ["Employee"];
    this.completed = 0;
    {
      timestamps: true;
    }
  }
}

module.exports = {
  Note,
};
