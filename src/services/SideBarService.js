const PoliticianStock = async (authToken, PoliticianName) => {
  const response = await fetch(
    `http://www.fluxdux.com:443/getPoliticianStock/${authToken}/${PoliticianName}/`,
  );

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    console.error(message);
    return;
  }

  const jsonData = await response.json();
  return jsonData;
};

const HedgeFundStock = async (authToken, HedgeManageName) => {
  const response = await fetch(
    `http://www.fluxdux.com:443/getHedgeFundStock/${authToken}/${HedgeManageName}/`,
  );

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    console.error(message);
    return;
  }

  const jsonData = await response.json();
  return jsonData;
};

const PoliticanNameList = async (authToken, StockSymbol) => {
  const response = await fetch(
    `http://www.fluxdux.com:443/getPoliticianName/${authToken}/${StockSymbol}/`,
  );

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    console.error(message);
    return;
  }

  const jsonData = await response.json();
  return jsonData;
};

const HedgeFundNameList = async (authToken, StockSymbol) => {
  const response = await fetch(
    `http://www.fluxdux.com:443/getManagerName/${authToken}/${StockSymbol}/`,
  );

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    console.error(message);
    return;
  }

  const jsonData = await response.json();
  return jsonData;
};

export default {
  PoliticianStock,
  HedgeFundStock,
  PoliticanNameList,
  HedgeFundNameList,
};
