// Transformer to format the currency data in a more usable way
const transformSupportedCurrencies = (currencies) => {
  if (!currencies) {
    return;
  }

  return currencies.map((currency) => ({ value: currency[0], label: currency[1] }));
}

export default transformSupportedCurrencies;