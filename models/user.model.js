module.exports = (obj) => {
       const User = {
              id: obj.id || null,
              username: obj.username || null,
              email: obj.email || null,
              password: obj.password || null,
       };
       return User;
};