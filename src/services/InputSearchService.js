const InputSearch = async (authToken, stockSymbol) => {
  const response = await fetch(
    `https://fluxdux.com/getSingleStock/${authToken}/${stockSymbol}/`,
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
  InputSearch,
};
