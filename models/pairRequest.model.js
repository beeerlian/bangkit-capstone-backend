class PairRequest {
       constructor(obj) {
              this.id = obj.id || null
              this.senderId = obj.senderId;
              this.recieverId = obj.recieverId;
              this.camDetail = obj.camDetail;
              this.clientDetail = obj.clientDetail;
              this.accepted = obj.accepted || false
              this.time = obj.time || null;
       }

       toObj() {
              return {
                     id: this.id,
                     senderId: this.senderId,
                     recieverId: this.recieverId,
                     camDetail: this.camDetail,
                     clientDetail: this.clientDetail,
                     accepted: this.accepted,
                     time: this.time
              }
       }
}

module.exports = PairRequest;