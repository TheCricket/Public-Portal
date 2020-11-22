export class User {
  constructor(username, pin, isAdmin) {
    this.username = username;
    this.pin = pin;
    this.isAdmin = isAdmin;
  }

  toString() {
    return `${this.username}, ${this.pin}, ${this.isAdmin}`
  }
}


export default {
  toFirestore(user) {
    return {
      username: user.username,
      pin: user.pin,
      isAdmin: user.isAdmin
    }
  },
  fromFireStore(snapshot, options) {
    const data = snapshot.data(options);
    return new User(data.username, data.pin, data.isAdmin);
  }
}