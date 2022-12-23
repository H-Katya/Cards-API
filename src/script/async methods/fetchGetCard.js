export default async function fetchGetCard(token,id) {
  let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let result = await response.json();
  return await result;
}