module.exports = (obj) => {
       const User = {
              id: obj.id || null,
              username: obj.username || null,
              email: obj.email || null,
              password: obj.password || null,
       };
       return User;
};



class User {
       constructor(obj) {
              this.id = obj.id || null;
              this.username = obj.username || null;
              this.email = obj.email || null;
              this.password = obj.password || null;
              this.fcm = obj.fcm || null;
              this.lastLoggedIn = obj.lastLoggedIn || null;
       }
       toObj() {
              return {
                     id: this.id,
                     username: this.username,
                     email: this.email,
                     password: this.password,
                     fcm: this.fcm,
                     lastLoggedIn: this.lastLoggedIn,
              }
       }
       toObjSensored() {
              return {
                     id: this.id,
                     username: this.username,
                     email: this.email,
                     lastLoggedIn: this.lastLoggedIn,
              }
       }
}
module.exports = User;