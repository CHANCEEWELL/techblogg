const dateFormat = require("dateformat");
dateFormat.masks.mine = 'yyyy-mm-dd hh:MM:ss';

module.exports = {
    formatDate: (date) =>{
      return formatted = dateFormat(date, 'mine');
      }
};