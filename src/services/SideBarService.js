const PoliticianStock = async (authToken, PoliticianName) => {
  const response = await fetch(
    `https://fluxdux.com/getPoliticianStock/${authToken}/${PoliticianName}/`,
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
    `https://fluxdux.com/getHedgeFundStock/${authToken}/${HedgeManageName}/`,
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
    `https://fluxdux.com/getPoliticianName/${authToken}/${StockSymbol}/`,
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
    `https://fluxdux.com/getManagerName/${authToken}/${StockSymbol}/`,
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
