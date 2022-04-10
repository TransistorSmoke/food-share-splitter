const resetFieldErrorFlags = (objFormFields) => {
  if (objFormFields) {
    Object.keys(objFormFields).forEach((key) => {
      objFormFields[key] = false;
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
      if (!order.dateOrdered) {
        objFormFields.isInvalidDate = true;
      }

      // 2.) Validate item
      if (!order.foodItem || order.foodItem.trim().length <= 0) {
        objFormFields.isInvalidItem = true;
      }

      // 3.) Validate price
      if (!order.price || isNaN(order.price) || order.price?.trim().length <= 0) {
        objFormFields.isInvalidPrice = true;
      }
    }

    // Used 'every' to simulate a 'break' for a falsy value of objFormFields[key] is encountered.
    formFieldKeys.every((key) => {
      if (objFormFields[key]) {
        isValidForm = false;
        return false;
      } else {
        isValidForm = true;
      }
      return true;
    });

    return isValidForm;
  },
};
