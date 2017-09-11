export default (link, onupdateImg, accountId) => {
  let base64 = link.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  const xhttp = new XMLHttpRequest();
  xhttp.open('POST','https://api.imgur.com/3/image',true)
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", `Client-ID 3d4890153c2eea4`);
  xhttp.send(JSON.stringify({'image': base64}));
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const imgSrc = JSON.parse(xhttp.responseText).data.link || '';
      onupdateImg({
        avatar: imgSrc,
        accountId
      });
    }
  }
};