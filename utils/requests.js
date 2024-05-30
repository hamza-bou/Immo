import axios from 'axios';


const apiUrl = process.env.NEXT_PUBLIC_API_URL || null;

async function fetchProperties() {
  try {
    if (!apiUrl) {
      return [];
    }

    const res = await fetch(`${apiUrl}/properties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchProperty(id) {
  try {
    if (!apiUrl) {
      return [];
    }
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`);

    if (response.status < 200 || response.status >= 300) {
      throw new Error('Failed to fetch data');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}


export { fetchProperties,fetchProperty };
