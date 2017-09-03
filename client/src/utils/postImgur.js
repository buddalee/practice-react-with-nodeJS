export default (link) => {
  let base64 = link.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  const xhttp = new XMLHttpRequest();
  xhttp.open('POST','https://api.imgur.com/3/image',true)
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", `Client-ID 3d4890153c2eea4`);
  xhttp.send(JSON.stringify({'image': base64}));
  xhttp.onreadystatechange = function(x) {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      const avatarSrc = JSON.parse(xhttp.responseText).data.link;
      debugger;
      return avatarSrc;
    }
    return null;
  }
};