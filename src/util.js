class Util {
  static #defaultFormat = Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency",
  });

  static formatCurrency(value) {
    return this.#defaultFormat.format(value);
  }
}

module.exports = Util;
