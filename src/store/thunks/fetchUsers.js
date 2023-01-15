import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  await pause(2000);

  return response.data;
});

//dev only!!! Adding pause helper function to simulate data fetching
const pause = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
};

export { fetchUsers };
