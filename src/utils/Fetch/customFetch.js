async function customFetch(url, requestMethod, jwt, requestBody) {
    const fetchData = {
      headers: {
        "Content-Type": "application/json",
      },
      method: requestMethod,
    };
  
    if (jwt) {
      fetchData.headers.Authorization = `Bearer ${jwt}`;
    }
  
    if (requestBody) {
      fetchData.body = JSON.stringify(requestBody);
    }
  
    try {
      const response = await fetch(url, fetchData);
  
      if (response.status === 200) {
        const contentType = response.headers.get("content-type");
  
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return await response.json();
        } else {
          return await response.text();
        }
      }
    } catch (error) {
      console.error("Error in customFetch:", error);
      throw error;
    }
  }
  
  export default customFetch;
  