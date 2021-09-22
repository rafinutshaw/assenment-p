import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://pt-fe-test-api.herokuapp.com/api",
  timeout: 3000,
  headers: {
    accept: "application/json",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF1YXppdGFoc2ludWxAZ21haWwuY29tIiwibmFtZSI6IlF1YXppIiwiaXNfbWVyY2hhbnRfYXBwcm92ZWQiOnRydWUsIm1lcmNoYW50X2lkIjo5NSwidG9rZW5faWRlbnRpZmllciI6IjE2MzIzMTY4MjIzNjJfNWs2aHlkX3F1YXppdGFoc2ludWxAZ21haWwuY29tIiwiaWF0IjoxNjMyMzE2ODIyLCJleHAiOjE2MzI0MDMyMjJ9.8BkMRMOzblClcr5xm8TCNH1-8BkuwWBw1vyA5AswXls",
  },
});
