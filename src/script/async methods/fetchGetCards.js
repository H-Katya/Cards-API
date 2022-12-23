export default async function fetchGetCard(token) {
  let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let result = await response.json();
  return await result;
}