import { filterData } from './globalHelpers'
const baseUrl = process.env.API_URL;

export const fetchData = async (setLoading, setCompleteData, setError) => {
  setError(false);
  setLoading(true);
  const url = `${baseUrl}/getData`;
  try {
    const response = await fetch(url, {
      method: 'GET', // default method
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
        // 'Authorization': 'Bearer YOUR_TOKEN'
      },
    });
    const data = await response.json(); // need to convert it into js object otherwise not usable

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Expected an object');
    }

    // Example: Check for specific required fields
    if (!data.en || !data.es) {
      throw new Error('Invalid data: Missing required fields (en or es)');
    }
    
    setCompleteData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

