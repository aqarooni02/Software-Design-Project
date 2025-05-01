export const localStorageManager ={

    storeEncodedObject(key, obj) {
    try {
      const jsonString = JSON.stringify(obj);
      // console.log(jsonString)
      const base64Encoded = btoa((jsonString)); // Handles Unicode
      // console.log(base64Encoded)
      localStorage.setItem(key, base64Encoded);
    } catch (err) {
      console.error("Failed to store object:", err);
    }
  },

  retrieveEncodedObject(key) {
    try {
      const storedData = localStorage.getItem(key);
      // console.log("retrieved this", storedData)
      if (!storedData) return null;

      const jsonString = atob(storedData); // Handles Unicode
      // console.log(jsonString)
      return JSON.parse(jsonString);
    } catch (err) {
      console.error("Failed to retrieve or parse object:", err);
      return null;
    }
  }
}