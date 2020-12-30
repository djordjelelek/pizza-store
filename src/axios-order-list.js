import axios from "axios";

let orderListAxios = axios.create({
  baseURL:
    "https://pizza-store-62afa-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default orderListAxios;
