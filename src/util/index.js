export default {
  capitalize: (text) => {
    if (!text) {
      return "Error parámetro incompleto, capitalize";
    }

    const cut = text[0];
    return cut[0].concat(text.slice(1, text.length));
  },
};
