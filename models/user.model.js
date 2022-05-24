class User {
       constructor(obj) {
              this.id = obj.id || null;
              this.username = obj.username || null;
              this.email = obj.email || null;
              this.password = obj.password || null;
              this.role = obj.role || null;
              this.fcm = obj.fcm || null;
              this.lastLoggedIn = obj.lastLoggedIn || null;
              this.connection = obj.connection || [];
       }
       toObj() {
              return {
                     id: this.id,
                     username: this.username,
                     email: this.email,
                     password: this.password,
                     role: this.role,
                     fcm: this.fcm,
                     lastLoggedIn: this.lastLoggedIn,
                     connection : this.connection,
              }
       }
       toObjSensored() {
              return {
                     id: this.id,
                     username: this.username,
                     email: this.email,
                     role: this.role,
                     lastLoggedIn: this.lastLoggedIn,
              }
       }
}
module.exports = User;