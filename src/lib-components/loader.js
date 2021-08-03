function loadScript(url, callback) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;

    var x = document.getElementsByTagName('head')[0];
    x.appendChild(s);
    if (typeof callback == "function") {
        s.onload = callback;
        s.src = url;
    }
}
  
