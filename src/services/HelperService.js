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
        console.log('objFormFields.isInvalidDate: ', objFormFields.isInvalidDate);
      }

      // 2.) Validate item
      console.log('food item: ', order.foodItem);
      if (!order.foodItem || order.foodItem.trim().length <= 0) {
        objFormFields.isInvalidItem = true;
        console.log('objFormFields.isInvalidItem: ', objFormFields.isInvalidItem);
      }

      // 3.) Validate price
      if (!order.price || isNaN(order.price) || order.price?.trim().length <= 0) {
        objFormFields.isInvalidPrice = true;
        console.log('objFormFields.isInvalidPrice: ', objFormFields.isInvalidPrice);
      }
    }

    // Used 'every' to simulate a 'break' for a falsy value of objFormFields[key] is encountered.
    formFieldKeys.every((key) => {
      console.log(objFormFields[key]);
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
