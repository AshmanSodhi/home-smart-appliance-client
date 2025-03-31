// src/utils/validationUtils.js
export const validateEmail = (email) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(email);
  };
  
  export const validatePassword = (password) => {
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordFormat.test(password);
  };
  
  export const validateLoginForm = (email, password) => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Email and Password cannot be empty!");
      return false;
    }
  
    if (!validateEmail(email)) {
      alert("You have entered an invalid email address!");
      return false;
    }
  
    if (!validatePassword(password)) {
      alert("Please enter password according to the format specified!");
      return false;
    }
  
    return true;
  };
  
  export const validateRegistrationForm = (name, email, password) => {
    if (name.trim() === "") {
      alert("Name cannot be empty!");
      return false;
    }
  
    if (email.trim() === "" || password.trim() === "") {
      alert("Email and Password cannot be empty!");
      return false;
    }
  
    if (!validateEmail(email)) {
      alert("You have entered an invalid email address!");
      return false;
    }
  
    if (!validatePassword(password)) {
      alert("Please enter password according to the format specified!");
      return false;
    }
  
    return true;
  };