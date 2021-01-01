export default {
  capitalize: (text) => {
    if (!text) {
      return "Error parámetro incompleto, capitalize";
    }

    const cut = text[0];
    return cut[0].concat(text.slice(1, text.length));
  },
  validateEmail: (email) => {
    if (!email) {
      return false;
    }
    if (
      /^\w+([.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(
        email
      )
    ) {
      return true;
    } else {
      return false;
    }
  },
};
