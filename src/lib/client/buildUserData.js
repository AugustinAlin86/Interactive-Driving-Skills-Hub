
import { serverTimestamp } from "firebase/firestore";


export function buildUserData(user, overrides = {}) {
  return {
    uid: user?.uid || "",
    email: user?.email || "",
    firstName: "",
    lastName: "",
    dob: "",
    licenceNo: "",
     telephone: "",
  
    createdAt: serverTimestamp(),
    ...overrides, 
  };
}