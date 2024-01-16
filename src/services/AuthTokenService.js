const AuthToken = async (userName) => {
  const response = await fetch(`https://fluxdux.com/getJWT/${userName}/`);

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
