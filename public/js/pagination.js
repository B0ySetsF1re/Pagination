function checkForGenError() {
  if($('div#status').text()!='')
      {
                alert($('div#status').text());
      }
}

window.onload = () => {
  checkForGenError();
}
