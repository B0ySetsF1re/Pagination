function checkForError() {
  if($('div#status').text()!='')
      {
                alert($('div#status').text());
      }
}

window.onload = () => {
  checkForError();
}
