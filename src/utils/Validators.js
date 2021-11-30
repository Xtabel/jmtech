const validators = {
    isRequired: (value = "", len = 1, max = 0, select = false) => {
      if (!select)    
        return max < 1 ? value.toString().length >= len ? true : false : value.toString().length >= len && value.toString().length <= max ? true : false;
  
      return value === 0 ? false : true;
    },
    isValidEmail: (value = "") => {
     // eslint-disable-next-line
      let mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      return mailformat.test(value) === false ? false : true;
    },
    isNumeric: (value = 0) => {
      if(isNaN(value) || value < 1){
        return false
      }else{
        return true
      }
    },
  }
  
  export default validators;
  