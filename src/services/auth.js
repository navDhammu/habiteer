import { signOut } from "firebase/auth";
import { auth } from ".";

export function logout() {
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log("error while signing out");
    });
}
