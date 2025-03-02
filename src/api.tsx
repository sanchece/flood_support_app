// import axios from "axios";
// const resourceData = async function fetchData(setData, isSpanish) {
//     const params = { isSpanish: isSpanish }
//     try {
//         await axios.get(process.env.API_URL, { params })
//             .then(function ({ data }) {
//                 setData(data);
//             })
//     } catch (error) {
//         setData([])
//     }
// }
// export default resourceData;
const baseUrl = process.env.API_URL;
export const fetchData = async (setLoading, setData, setError, isSpanish) => {

  setLoading(true);
  // const params = ;
  const params = new URLSearchParams({ isSpanish: isSpanish });
  // const url = baseUrl + '/resources' + params.toString();
  const url =   `${baseUrl}/resources?${params.toString()}`;
  console.log('url',url);
  try {
    const response = await fetch(url + '/resources', {
      method: 'GET', // default method
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
        // 'Authorization': 'Bearer YOUR_TOKEN'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    setData(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

