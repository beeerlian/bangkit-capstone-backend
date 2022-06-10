class Connection {
       constructor(obj) {
              this.user = obj.user;
              this.time = obj.time;
       }
       toObj() {
              return {
                     user: this.user,
                     time: this.time
              }
       }
}

module.exports = Connection;