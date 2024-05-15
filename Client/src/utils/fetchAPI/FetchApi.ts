import { UserType } from "../../types/user/UserType";

export async function patchDataUser(url: string, data: UserType, token: string | null) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();

  if (response.ok) {
    alert("User Updated!");
  } else {
    alert(responseJson.error);
    console.log(responseJson.error);
  }
}
