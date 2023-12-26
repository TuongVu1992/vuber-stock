const AuthToken = async (userName) => {
  const response = await fetch(
    `http://www.fluxdux.com:443/getJWT/${userName}/`,
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
  AuthToken,
};
