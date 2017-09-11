const axios = require('axios');

const instance = axios.create({
  headers: {
    'Content-type': 'application/json',
    'Authorization': 'Client-ID 3d4890153c2eea4'
  },
});
export default (link) => {
  let base64 = link.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  const res = instance.post('https://api.imgur.com/3/image', JSON.stringify({ 'image': base64 }))
  console.log('res: ', res);
  try {
    return res;
  } catch (err) {
    console.log(err);
  }
};