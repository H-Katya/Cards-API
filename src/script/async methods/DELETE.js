export default async function fetchDelete(id,token) {
  let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.status;
  }
  
}