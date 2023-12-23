module.exports = {
    // Define your custom helpers here
    formatDate: function (date) {
        if (!date) {
            // Handle undefined or null date
            return 'No date provided';
        }
  
        let dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            // Handle invalid date
            return 'Invalid date';
        }
  
        // Format and return the valid date
        return dateObj.toLocaleDateString(); // Example formatting
    },
    truncate: function (str, len) {
      if (str.length > len && str.length > 0) {
          let new_str = str + ' ';
          new_str = str.substr(0, len);
          new_str = str.substr(0, new_str.lastIndexOf(' '));
          new_str = new_str.length > 0 ? new_str : str.substr(0, len);
          return new_str + '...';
      }
      return str;
  },
  // Add more helpers as needed
  };
    // Add more helpers as needed