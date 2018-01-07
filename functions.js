var localStorageBackup = function() {
  var backup = {};
  for (i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    backup[key] = escape(encodeURIComponent(value));
  }
  var json = JSON.stringify(backup);
  var base = btoa(json);
  var href = 'data:text/javascript;charset=utf-8;base64,' + base;
  var link = document.createElement('a');
    link.setAttribute('download', 'localStorageBackup ' + location.host + localStorageGetTimeInString(' year-month-day hours-minutes-seconds') + '.json');
  link.setAttribute('href', href);
  document.querySelector('body').appendChild(link);
  link.click();
  link.remove();
};

var localStorageRestore = function() {
  var t = document.createElement('div');
  var a = document.createElement('a');
  a.appendChild(document.createTextNode('X'));
  a.setAttribute('href', '#');

  a.style.position = 'fixed';
  a.style.top = '10px';
  a.style.right = '10px';
  a.style['text-decoration'] = 'none';
  a.style.color = '#fff';
  t.appendChild(a);
  a.onclick = function() {
      t.remove();
  };
  t.style.width = '50%';
  t.style.position = 'fixed';
  t.style.top = '25%';
  t.style.left = '25%';
  t.style['background-color'] = 'gray';
  t.style['text-align'] = 'center';
  t.style.padding = '50px';
  t.style.color = '#fff';
  t.style['z-index'] = 10000;

  var l = document.createElement('input');
  l.setAttribute('type', 'file');
  l.setAttribute('id', 'fileinput');
  l.onchange = function(e) {
      t.remove();
      var f = e.target.files[0];
      if (f) {
          var reader = new FileReader();
          reader.onload = function(e) {
              var text = e.target.result;
              var backup = JSON.parse(text);
              for (var key in backup){
                 var value = decodeURIComponent(unescape(backup[key]));
                 window.localStorage.setItem(key, value);
               }
              alert('Imported ' + Object.keys(backup).length + ' items from backup.')
          };
          reader.readAsText(f);
      } else {
        alert('Failed to load file');
      }
  };
  var a = document.createElement('h3');
  a.appendChild(document.createTextNode('Select file with backup'));
  t.appendChild(a);
  t.appendChild(l);
  document.querySelector('body').appendChild(t);
};

var localStorageClear = function() {
  if(window.confirm('Do you really want to delete all ' + localStorage.length + ' localStorage items of this website?')) {
    localStorage.clear();
  }
};

var localStorageGetTimeInString = function(text){
  let newDate = new Date();
  //normalize month
  let month = newDate.getMonth() + 1;
  if( month < 10 ){
    month = '0' + month;
  };
  //normalize day
  let day = newDate.getDate();
  if( day < 10 ){
    day = '0' + day;
  };
  text = text
    .replace(/year/g, newDate.getFullYear())
    .replace(/month/g, month)
    .replace(/day/g, day)
    .replace(/hours/g, newDate.getHours())
    .replace(/minutes/g, newDate.getMinutes())
    .replace(/seconds/g, newDate.getSeconds());
  return text;
}
