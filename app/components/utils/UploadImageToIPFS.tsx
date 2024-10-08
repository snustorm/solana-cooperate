import axois from 'axios'

const axios = require('axios')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkNmZkNTkzYy1kM2Y1LTQxOTgtOWU5Ny1iZTBmZWZmZTVlMzEiLCJlbWFpbCI6ImNoZXN0ZXJtb25nbzIwMjZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImM4NjM5N2NkYjRlOTZmMzhkYzI0Iiwic2NvcGVkS2V5U2VjcmV0IjoiOTA1M2U2ZWEyZjNlZDI5MjI2Zjk1YzFiZDcxYzVkNjk5YjA4NzcxYjU2OGRiYmU5ZGYxM2ZhMDk1YTdkYTU4ZCIsImlhdCI6MTcyNTUyNDc1NX0.pHREe9EDxk_Yp685wYA0spHXQ3QnRVONp_MGjYp0t5Y'

const PINATA_API_KEY = '69243dde23d605fb482c';
const PINATA_SECRET_API_KEY = '487da51288f0e05c0849bb568b09e8ee81c28ca1c78c28b0ed4820333a797037';

export const pinFileToIPFS = async (file: File) => {
    
    const formData = new FormData();    
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log('Pinata response:', res.data);
      
      let response = res.data;
      if(response?.IpfsHash) {
            return `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
      } else {
            return null;
    }  

    } catch (error) {
      console.error('Error uploading file to Pinata:', error);
       return null;
    }
}



// Function to pin JSON to IPFS
export const pinJSONToIPFS = async (json: any) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    try {
        const response = await axios.post(url, json, {
            headers: {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading JSON to IPFS:', error);
        return null;
    }
};
