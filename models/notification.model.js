
class Notification {
       constructor(obj) {
              this.id = obj.id || null;
              this.message = obj.message || "empty";
              this.from = obj.from;
              this.to = obj.to;
              this.imagePath = obj.imagePath || null;
              this.time = obj.time || new Date().getTime();
       }

       toObj() {
              return {
                     id: this.id,
                     message: this.message,
                     from: this.from,
                     to: this.to,
                     imagePath: this.imagePath,
                     time: this.time,
              }
       }
}
module.exports = Notification;