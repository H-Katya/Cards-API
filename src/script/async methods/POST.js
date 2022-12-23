export default async function fetchPost(obj,token) {
  const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(obj),
  });
  const result = await response.json();
  return await result;
}