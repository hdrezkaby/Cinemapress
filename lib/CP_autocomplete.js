'use strict';

/**
 * Configuration dependencies.
 */

var config = require('../config/production/config');
Object.keys(config).length === 0 &&
  (config = require('../config/production/config.backup'));
var config_md5 = require('md5')(JSON.stringify(config));

setInterval(function() {
  if (
    config_md5 &&
    process.env['CP_CONFIG_MD5'] &&
    config_md5 !== process.env['CP_CONFIG_MD5']
  ) {
    config = require('../config/production/config');
    Object.keys(config).length === 0 &&
      (config = require('../config/production/config.backup'));
    config_md5 = process.env['CP_CONFIG_MD5'];
  }
  config = Object.assign({}, config);
  delete config.h1;
  delete config.titles;
  delete config.descriptions;
}, 3333);

/**
 * Add autocomplete script.
 *
 * @return {String}
 */

function codeAutocomplete() {
  return (
    '<script>' +
    'document.addEventListener("DOMContentLoaded", function() {' +
    '    var e = document.querySelectorAll("input[data-autocomplete]");' +
    '    if (e)' +
    '        for (var t = 0; t < e.length; t++) e[t].setAttribute("autocomplete", "off");' +
    '    var n = document.querySelectorAll(".cinemapress-autocomplete");' +
    '    var sleep2 = 0;' +
    '    if (n)' +
    '        for (var o = 0; o < n.length; o++) {' +
    "            var a = document.querySelector('input[data-autocomplete=\"' + n[o].dataset.autocomplete + '\"]');" +
    '            if (!a) return;' +
    '            var event_list = ["input", "click"]; ' +
    '            event_list.forEach(function(event) {' +
    '               a.addEventListener(event, function() {' +
    '                 var self = this;' +
    '                 if (sleep2) {clearTimeout(sleep2)}' +
    '                 sleep2 = setTimeout(function() {' +
    '                       if (self && self.value && !(self.value.length <= 3)) {' +
    '                           var r = self.value,' +
    "                               s = document.querySelector('div[data-autocomplete=\"' + self.dataset.autocomplete + '\"]');" +
    '                           s.style.display = "none";' +
    '                           var i = new XMLHttpRequest;' +
    '                           i.open("GET", (window.location.href.indexOf("/mobile-version") + 1 ? "/mobile-version" : "") + "/' +
    config.urls.search +
    '?json=1&q=" + encodeURIComponent(r)), i.responseType = "json", i.send(), i.onload = function() {' +
    '                               if (200 === i.status && i.response && i.response.movies && i.response.movies.length) {' +
    '                                   var e = document.createElement("ul");' +
    '                                   e.classList.add("b-search__section_list");' +
    '                                   s.innerHTML = "", s.appendChild(e);' +
    '                                   for (var t = 0; t < i.response.movies.length; t++) {' +
    '                                       var n = i.response.movies[t],' +
    '                                           o = document.createElement("li");' +
    '                                       o.dataset.url = n.url, o.innerHTML = \'<a href="\' + n.url + \'"><img src="\' + n.poster_min + \'" alt="Poster"> <span class="enty"><strong>\' + ' +
    '                                           n.title + \'</strong></span><b> (<span>\' + n.year + \', \' + n.country + \', \' + n.genre + \'</b></span>) ' +
    '                                             <span class="rating"><i class="hd-tooltip tooltipstered">\' + n.rating/10 + \'</i></span></a>\', ' +
    '                                               o.addEventListener("click", function() {' +
    '                                           window.location.href = this.dataset.url' +
    '                                       }), e.appendChild(o)' +
    '                                   }' +
    '                                   var a = document.createElement("div");' +
    '                                   a.innerHTML = "' +
    config.l.results +
    '", a.addEventListener("click", function() {' +
    '                                    window.location.href = (window.location.href.indexOf("/mobile-version") + 1 ? "/mobile-version" : "") + "/' +
    config.urls.search +
    '?q=" + encodeURIComponent(r)' +
    '                                   }), s.appendChild(a), s.style.display = "block"' +
    '                               }' +
    '                           }, document.addEventListener("click", function(e) {' +
    '                               s.contains(e.target || e.srcElement) || (s.style.display = "none")' +
    '                           })' +
    '                       }' +
    '                   },1000)' +
    '               })' +
    '            })' +
    '        }' +
    '});' +
    '</script>'
  );
}

module.exports = {
  code: codeAutocomplete
};
