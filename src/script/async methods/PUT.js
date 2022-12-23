export default async function fetchPut(obj,token) {
  let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${obj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(obj)
  });
  let result = await response.json();
  return await result;
};

