class PairRequest {
       constructor(obj) {
              this.id = obj.id || null
              this.senderId = obj.senderId;
              this.recieverId = obj.recieverId;
              this.camDetail = obj.camDetail;
              this.clientDetail = obj.clientDetail;
              this.status = obj.status || "PENDING"
              this.time = obj.time || null;
       }

       toObj() {
              return {
                     id: this.id,
                     senderId: this.senderId,
                     recieverId: this.recieverId,
                     camDetail: this.camDetail,
                     clientDetail: this.clientDetail,
                     status: this.status,
                     time: this.time
              }
       }
}

module.exports = PairRequest;