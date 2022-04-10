const resetFieldErrorFlags = (objFormFields) => {
  if (objFormFields) {
    Object.keys(objFormFields).forEach((key) => {
      objFormFields[key] = null;
    });
  }
};

export default {
  validateForm(order, objFormFields) {
    let isValidForm = false;
    const formFieldKeys = Object.keys(objFormFields);

    resetFieldErrorFlags(objFormFields);

    if (order) {
      // 1.) Validate date
      if (order.dateOrdered && order.dateOrdered.toString().trim().length > 0) {
        objFormFields.isValidDate = true;
      }

      // 2.) Validate item
      if (order.foodItem && order.foodItem.trim().length > 0) {
        objFormFields.isValidItem = true;
      }

      // 3.) Validate price
      if (order.price && (!isNaN(order.price) || order.price.trim().length > 0)) {
        objFormFields.isValidPrice = true;
      }
    }

    // Used 'every' to simulate a 'break' for a falsy value of objFormFields[key] is encountered.
    formFieldKeys.every((key) => {
      if (objFormFields[key]) {
        isValidForm = true;
      } else {
        isValidForm = false;
        return false;
      }
      return true;
    });

    return isValidForm;
  },
};
