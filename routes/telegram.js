'use strict';

process.env['NTBA_FIX_319'] = 1;

/**
 * Configuration dependencies.
 */

var config = require('../config/production/config');
Object.keys(config).length === 0 &&
  (config = require('../config/production/config.backup'));

/**
 * Node dependencies.
 */

var TelegramBot = require('node-telegram-bot-api');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

router.use(bodyParser.json());

/*
<!-- Вствить в вниз шаблона /themes/шаблон/views/includes/footer.ejs -->
<link href="/telegram/style.css?v=<%- page.ver %>" rel="stylesheet"/>
<script src="/telegram/script.js?v=<%- page.ver %>"></script>
<script src="/telegram/rand.js?v=<%- Math.random() %>"></script>
*/

/* ------------------------ TOKEN ------------------------ */
var TOKEN = '5814089263:AAGElvfczvso533Z9leF20f8Vn2Dok7kSmg';
/* ------------------------------------------------------- */

/* ----------------------- CHAT_ID ----------------------- */
var CHAT_ID = 801264004;
/* ------------------------------------------------------- */

if (!TOKEN) return (module.exports = router);

var cinemaLang = {
  success: 'Спасибо за Ваше сообщение!',
  id: 'Не заполнен CHAT_ID',
  ip: 'Не найден Ваш IP',
  message: 'Не заполнено сообщение',
  rand: 'Неправильно посчитана капча',
  cookies: 'Включите cookies или обновите страницу'
};

var bot = new TelegramBot(TOKEN);

bot.setWebHook(
  config.protocol + config.subdomain + config.domain + '/telegram/bot' + TOKEN
);

bot.on('message', function(msg) {
  if (!CHAT_ID) {
    CHAT_ID = msg.chat.id;
    bot.sendMessage(msg.chat.id, msg.chat.id);
  }
});

router.post('/bot' + TOKEN, function(req, res) {
  bot.processUpdate(req.body);
  res;
});

router.post('/message', function(req, res) {
  var form = req.body;
  var ip = getIp(req);

  if (!CHAT_ID) {
    return res.json({
      color: 'red',
      message: cinemaLang.id
    });
  }

  if (!ip) {
    return res.json({
      color: 'red',
      message: cinemaLang.ip
    });
  }

  if (!form.message) {
    return res.json({
      color: 'red',
      message: cinemaLang.message
    });
  } else {
    form.message = decodeURIComponent(form.message);
  }

  if (!req.signedCookies || !req.signedCookies.CP_rand) {
    return res.json({
      color: 'red',
      message: cinemaLang.cookies
    });
  }

  var rand1 = req.signedCookies.CP_rand[0];
  var rand2 = req.signedCookies.CP_rand[1];

  if (!form.rand || '' + form.rand !== parseInt(rand1) + parseInt(rand2) + '') {
    return res.json({
      color: 'red',
      message: cinemaLang.rand
    });
  } else {
    req.signedCookies.CP_rand = '';
    res.clearCookie('CP_rand');
  }

  var matches = form.message.match(/\bhttps?:\/\/\S+/gi);
  var urls = matches
    ? matches
        .map(function(url, i) {
          var hostname = '';
          try {
            hostname = new URL(url).hostname;
          } catch (e) {
            console.log(e);
          }
          var regUrl = new RegExp('\\n' + url + '$', 'i');
          var n = regUrl.test(url) ? nums(i + 1) : '';
          form.message = form.message.replace(regUrl, '');
          form.message = form.message.replace(url, n);
          return hostname
            ? [
                {
                  text: n + ' ' + hostname,
                  url: url
                }
              ]
            : false;
        })
        .filter(Boolean)
    : null;

  var reply_markup =
    urls && urls.length
      ? {
          reply_markup: {
            inline_keyboard: urls
          }
        }
      : undefined;
  bot.sendMessage(
    CHAT_ID,
    form.message.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g, ''),
    reply_markup
  );
  return res.json({ color: 'green', message: cinemaLang.success });
});

router.get('/style.css', function(req, res) {
  res.header('Content-Type', 'text/css');
  res.send(
    '' +
      '.cinemaModal {\n' +
      '  display: none;\n' +
      '  position: fixed;\n' +
      '  z-index: 10000000;\n' +
      '  left: 0;\n' +
      '  top: 0;\n' +
      '  padding-top: 100px;\n' +
      '  width: 100%;\n' +
      '  height: 100%;\n' +
      '  overflow: auto;\n' +
      '  background-color: rgb(0,0,0);\n' +
      '  background-color: rgba(0,0,0,0.6);\n' +
      '  -webkit-animation-name: fadeIn;\n' +
      '  -webkit-animation-duration: 0.4s;\n' +
      '  animation-name: fadeIn;\n' +
      '  animation-duration: 0.4s\n' +
      '}\n' +
      '.cinemaModal-content {\n' +
      '  margin: auto;\n' +
      '  width: 70%;\n' +
      '  -webkit-animation-name: slideIn;\n' +
      '  -webkit-animation-duration: 0.4s;\n' +
      '  animation-name: slideIn;\n' +
      '  animation-duration: 0.4s\n' +
      '}\n' +
      '.cinemaModal-close {\n' +
      '  color: white;\n' +
      '  float: right;\n' +
      '  font-weight: bold;\n' +
      '}\n' +
      '.cinemaModal-close:hover,\n' +
      '.cinemaModal-close:focus {\n' +
      '  color: #999;\n' +
      '  text-decoration: none;\n' +
      '  cursor: pointer;\n' +
      '}\n' +
      '.cinemaModal-header {\n' +
      '  border-radius: 10px 10px 0 0;  \n' +
      '  padding: 10px 16px;\n' +
      '  background-image: linear-gradient(to right, #262626, #262626);\n' +
      '  color: #ccc;\n' +
      '  text-align: left;\n' +
      '}\n' +
      '.cinemaModal-body {\n' +
      '  background-image: linear-gradient(to right, #262626, #262626);\n' +
      '  color: #fff;\n' +
      '  padding: 0;\n' +
      '  margin: 0;\n' +
      '  position: relative;\n' +
      '  text-align: left;\n' +
      '}\n' +
      '.cinemaModal-footer {\n' +
      '  border-radius: 0 0 10px 10px;\n' +
      '  padding: 10px 16px;\n' +
      '  background-image: linear-gradient(to right, #262626, #262626);\n' +
      '  color: #ccc;\n' +
      '  text-align: left;\n' +
      '}\n' +
      '.cinemaModal-submit {\n' +
      '  padding: 9px 10px;\n' +
      // '  background-color: #666;\n' +
      // '  color: white;\n' +
      '  float: right;\n' +
      // '  font-size: 12px;\n' +
      '  border-radius: 3px 0px 10px 3px;\n' +
      '}\n' +
      '.cinemaModal-submit:hover {\n' +
      // '  background-color: #777;\n' +
      '  cursor: pointer;\n' +
      '}\n' +
      '.cinemaModal-rand {\n' +
      '  width: 30px;\n' +
      '  background-color: #ccc !important;\n' +
      '  color: #000 !important;\n' +
      '  border: 0 !important;\n' +
      '  padding: 0 4px;\n' +
      '  border-radius: 3px;\n' +
      '}\n' +
      '.cinemaModal-message {\n' +
      '  background-image: linear-gradient(to right, #262626, #262626);\n' +
      '  color: #fff;\n' +
      '  margin: 0;\n' +
      '  padding: 10px 16px;\n' +
      '  height: 100px;\n' +
      '  width: 100%;\n' +
      '  border: none !important;\n' +
      '  font-size: 14px;\n' +
      '  overflow: auto;\n' +
      '  outline: none;\n' +
      '  -webkit-box-shadow: none;\n' +
      '  -moz-box-shadow: none;\n' +
      '  box-shadow: none;\n' +
      '}\n' +
      '@-webkit-keyframes slideIn {\n' +
      '  from {bottom: -300px; opacity: 0} \n' +
      '  to {bottom: 0; opacity: 1}\n' +
      '}\n' +
      '@keyframes slideIn {\n' +
      '  from {bottom: -300px; opacity: 0}\n' +
      '  to {bottom: 0; opacity: 1}\n' +
      '}\n' +
      '@-webkit-keyframes fadeIn {\n' +
      '  from {opacity: 0} \n' +
      '  to {opacity: 1}\n' +
      '}\n' +
      '@keyframes fadeIn {\n' +
      '  from {opacity: 0} \n' +
      '  to {opacity: 1}\n' +
      '}' +
      ''
  );
});

router.get('/script.js', function(req, res) {
  res.header('Content-Type', 'text/javascript');
  res.send(
      '    var cinemaLang = {\n' +
      '        "name": "Обратная связь",\n' +
      '        "error": "Ошибка отправки сообщения",\n' +
      '        "message": "Заполните поле сообщения",\n' +
      '        "rand": "Заполните поле капчи",\n' +
      '        "placeholder": "Ваше сообщение",\n' +
      '        "submit": "Отправить"\n' +
      '    };\n' +
      '\n' +
      "    let psOverlayWrap = document.createElement('div');\n" +
      "    psOverlayWrap.setAttribute('id', 'ps-overlay-wrap');\n" +
      '    document.body.appendChild(psOverlayWrap);\n' +
      '\n' +
      "    let psContentHolder = document.createElement('div');\n" +
      "    psContentHolder.setAttribute('id', 'ps-content-holder');\n" +
      '    psOverlayWrap.appendChild(psContentHolder);\n' +
      '\n' +
      "    let psContent = document.createElement('div');\n" +
      "    psContent.setAttribute('id', 'ps-content');\n" +
      '    psContentHolder.appendChild(psContent);\n' +
      '\n' +
      "    let psReportContent = document.createElement('div');\n" +
      "    psReportContent.setAttribute('id', 'ps-report-content');\n" +
      "    psReportContent.setAttribute('style', 'display: none');\n" +
      '    psContent.appendChild(psReportContent);\n' +
      '\n' +
      "    let psReportTitle = document.createElement('div');\n" +
      "    psReportTitle.setAttribute('id', 'ps-report-title');\n" +
      "    psReportTitle.setAttribute('class', 'cinemaModal-name');\n" +
      "    psReportTitle.textContent = 'Сообщить о проблеме с фильмом';\n" +
      '    psReportContent.appendChild(psReportTitle);\n' +
      '\n' +
      "    let psReportIssues = document.createElement('ul');\n" +
      "    psReportIssues.setAttribute('id', 'ps-report-issues');\n" +
      "    psReportContent.appendChild(psReportIssues);\n" +
      '\n' +
      "    let reportItem1 = document.createElement('li');\n" +
      "    reportItem1.classList.add('report-item');\n" +
      "    reportItem1.textContent = 'Плеер не отображается (только колесо загрузки либо сообщение)';\n" +
      "    reportItem1.dataset.cinemaText = 'Плеер не отображается (только колесо загрузки либо сообщение)';\n" +
      '\n' +
      "    let i1 = document.createElement('i');\n" +
      '    reportItem1.appendChild(i1);\n' +
      '    psReportIssues.appendChild(reportItem1);\n' +
      '\n' +
      "    let textarea1 = document.createElement('textarea');\n" +
      "    textarea1.id = 'ps-report-text';\n" +
      "    textarea1.classList.add('cinemaModal-message');\n" +
      "    textarea1.style.display = 'none';\n" +
      "    textarea1.placeholder = 'Выводится какое-то сообщение или просто крутится белое колесо загрузки? Какой антивирус установлен? Ссылка на скриншот плеера нам бы очень помогла';\n" +
      '    psReportIssues.appendChild(textarea1);\n' +
      '\n' +
      "    let reportItem2 = document.createElement('li');\n" +
      "    reportItem2.classList.add('report-item');\n" +
      "    reportItem2.textContent = 'Видео не запускается или черный экран после запуска';\n" +
      "    reportItem2.dataset.cinemaText = 'Видео не запускается или черный экран после запуска';\n" +
      '\n' +
      "    let i2 = document.createElement('i');\n" +
      '    reportItem2.appendChild(i2);\n' +
      '    psReportIssues.appendChild(reportItem2);\n' +
      '\n' +
      "    let textarea2 = document.createElement('textarea');\n" +
      "    textarea2.id = 'ps-report-text';\n" +
      "    textarea2.classList.add('cinemaModal-message');\n" +
      "    textarea2.style.display = 'none';\n" +
      "    textarea2.placeholder = 'Видео резко оборвалось или после рекламы просто не запустилось? Какой антивирус установлен?';\n" +
      '    psReportIssues.appendChild(textarea2);\n' +
      '\n' +
      "    let reportItem3 = document.createElement('li');\n" +
      "    reportItem3.classList.add('report-item');\n" +
      "    reportItem3.textContent = 'Звук и видео не совпадают';\n" +
      "    reportItem3.dataset.cinemaText = 'Звук и видео не совпадают';\n" +
      '\n' +
      "    let i3 = document.createElement('i');\n" +
      '    reportItem3.appendChild(i3);\n' +
      '    psReportIssues.appendChild(reportItem3);\n' +
      '\n' +
      "    let textarea3 = document.createElement('textarea');\n" +
      "    textarea3.id = 'ps-report-text';\n" +
      "    textarea3.classList.add('cinemaModal-message');\n" +
      "    textarea3.style.display = 'none';\n" +
      "    textarea3.placeholder = 'Начиная с какой минуты или секунды? Или с самого начала?';\n" +
      '    psReportIssues.appendChild(textarea3);\n' +
      '\n' +
      "    let reportItem4 = document.createElement('li');\n" +
      "    reportItem4.classList.add('report-item');\n" +
      "    reportItem4.textContent = 'Ошибка в описании';\n" +
      "    reportItem4.dataset.cinemaText = 'Ошибка в описании';\n" +
      '\n' +
      "    let i4 = document.createElement('i');\n" +
      '    reportItem4.appendChild(i4);\n' +
      '    psReportIssues.appendChild(reportItem4);\n' +
      '\n' +
      "    let textarea4 = document.createElement('textarea');\n" +
      "    textarea4.id = 'ps-report-text';\n" +
      "    textarea4.classList.add('cinemaModal-message');\n" +
      "    textarea4.style.display = 'none';\n" +
      "    textarea4.placeholder = 'Поподробнее, пожалуйста';\n" +
      '    psReportIssues.appendChild(textarea4);\n' +
      '\n' +
      "    let reportItem5 = document.createElement('li');\n" +
      "    reportItem5.classList.add('report-item');\n" +
      "    reportItem5.textContent = 'Другое';\n" +
      "    reportItem5.dataset.cinemaText = 'Другое';\n" +
      '\n' +
      "    let i5 = document.createElement('i');\n" +
      '    reportItem5.appendChild(i5);\n' +
      '    psReportIssues.appendChild(reportItem5);\n' +
      '\n' +
      "    let textarea5 = document.createElement('textarea');\n" +
      "    textarea5.id = 'ps-report-text';\n" +
      "    textarea5.classList.add('cinemaModal-message');\n" +
      "    textarea5.style.display = 'none';\n" +
      "    textarea5.placeholder = 'Поподробнее, пожалуйста';\n" +
      '    psReportIssues.appendChild(textarea5);\n' +
      '\n' +
      "    let psReportDescription = document.createElement('div');\n" +
      "    psReportDescription.id = 'ps-report-description';\n" +
      "    psReportDescription.innerHTML = 'Если у Вас чёрный экран и вообще не грузится плеер, вероятно у вас IPv6 адрес. Рекомендуем использовать VPN или браузер Opera.';\n" +
      '    psReportContent.appendChild(psReportDescription);\n' +
      '\n' +
      "    let psReportHolderbuttons = document.createElement('div');\n" +
      "    psReportHolderbuttons.id = 'ps-report-holderbuttons';\n" +
      "    psReportHolderbuttons.innerHTML = '<button id=\"ps-report-send\" class=\"btn btn-action cinemaModal-submit\" type=\"button\"><i class=\"loading\"></i>Сообщить!</button>';\n" +
      '    psReportContent.appendChild(psReportHolderbuttons);\n' +
      '\n' +
      "    let psReportDataID = document.createElement('input');\n" +
      "    psReportDataID.id = 'ps-report-data-id';\n" +
      "    psReportDataID.type = 'hidden';\n" +
      '    psReportContent.appendChild(psReportDataID);\n' +
      '\n' +
      "    let psReportDataMisc = document.createElement('input');\n" +
      "    psReportDataMisc.id = 'ps-report-data-misc';\n" +
      "    psReportDataMisc.type = 'hidden';\n" +
      '    psReportContent.appendChild(psReportDataMisc);\n' +
      "    let divCinemaModalFooter = document.createElement('div');\n" +
      "    divCinemaModalFooter.setAttribute('class', 'cinemaModal-footer');\n" +
      '    psReportContent.appendChild(divCinemaModalFooter);\n' +
      '\n' +
      "    let divCinemaModalMath = document.createElement('span');\n" +
      "    divCinemaModalMath.setAttribute('class', 'cinemaModal-math');\n" +
      '    divCinemaModalFooter.appendChild(divCinemaModalMath);\n' +
      '\n' +
      "    let divCinemaModalEqual = document.createElement('span');\n" +
      "    divCinemaModalEqual.innerHTML = ' = ';\n" +
      '    divCinemaModalFooter.appendChild(divCinemaModalEqual);\n' +
      '\n' +
      "    let divCinemaModalRand = document.querySelector('input');\n" +
      "    divCinemaModalRand.setAttribute('class', 'cinemaModal-rand');\n" +
      "    divCinemaModalRand.setAttribute('type', 'text');\n" +
      '    divCinemaModalFooter.appendChild(divCinemaModalRand);\n' +
      '\n' +
      "    let divCinemaModalSubmit = document.querySelector('#ps-report-send');\n" +
      // "    divCinemaModalSubmit.setAttribute('class', 'cinemaModal-submit');\n" +
      // '    divCinemaModalFooter.appendChild(divCinemaModalSubmit);\n' +
      '\n' +
      "     let divCinemaModalClose = document.createElement('button');\n" +
      "     divCinemaModalClose.setAttribute('id', 'ps-close');\n" +
      "     divCinemaModalClose.setAttribute('class', 'cinemaModal-close');\n" +
      "     divCinemaModalClose.setAttribute('type', 'button');\n" +
      "     divCinemaModalClose.setAttribute('title', 'Закрыть');\n" +
      "     divCinemaModalClose.setAttribute('onclick', 'if (document.getElementById(\"ps-trailer-content\")) {closeTrailerOverlay()} else {closeReportOverlay()}');\n" +
      "     divCinemaModalClose.setAttribute('aria-label', 'Закрыть окно');\n" +
      "     psOverlayWrap.appendChild(divCinemaModalClose);\n" +
      '\n' +
      "    var cinemaUrl; var cinemaButtons = document.querySelectorAll('.cinemaButton');\n" +
      '    if (cinemaButtons) {\n' +
      '        cinemaButtons.forEach(function(btn) {\n' +
      "            btn.addEventListener('click', function(event) {\n" +
      '                event.preventDefault();\n' +
      "                document.body.classList.add('ps-body');\n" +
      "                psOverlayWrap.style.display = 'block';\n" +
      "                psReportContent.setAttribute('style', 'display: block');\n" +
      '                cinemaUrl = this.dataset.cinemaUrl;\n' +
      "                document.querySelector('.cinemaModal-name').innerHTML = cinemaLang.name;\n" +
      "                document.querySelectorAll('.cinemaModal-message')\n" +
      '                .forEach((item) => {\n' +
      "                    item.value = '';\n" +
      '                });\n' +
      "                document.querySelector('.cinemaModal-rand').value = '';\n" +
      "                psOverlayWrap.style.display = 'block';\n" +
      '            });\n' +
      '        });\n' +
      '    }\n' +
      "    let reportItem_arr = document.querySelectorAll('.report-item');\n" +
      '    reportItem_arr.forEach((item, i) => {\n' +
      "        item.addEventListener('click', function() {\n" +
      // "            psReportDescription.style.display = 'block';\n" +
      "            psReportHolderbuttons.style.display = 'block';\n" +
      "            document.querySelectorAll('textarea.cinemaModal-message')\n" +
      '            .forEach((item2) => {\n' +
      "                if (i == 0) {\n" +
      '                    resetTextarea(reportItem1, textarea1);\n' +
      '                } else if (i == 1) {\n' +
      '                    resetTextarea(reportItem2, textarea2);\n' +
      '                } else if (i == 2) {\n' +
      '                    resetTextarea(reportItem3, textarea3);\n' +
      '                } else if (i == 3) {\n' +
      '                    resetTextarea(reportItem4, textarea4);\n' +
      '                } else if (i == 4) {\n' +
      '                    resetTextarea(reportItem5, textarea5);\n' +
      '                }\n' +
      '            });\n' +
      '        });\n' +
      '    });\n' +
      '\n' +
      "    divCinemaModalSubmit.addEventListener('click', function() {\n" +
      "        var reportItemActive = psReportIssues.querySelector('li.active');\n" + // Заголовок
      "        var textareaActive = psReportIssues.querySelector('textarea.active');\n" + // Стандартный текст
      "        var cinemaMessage;\n" +
      "        var cinemaRand = document.querySelector('.cinemaModal-rand');\n" +
      "        if (textareaActive && textareaActive.value && cinemaRand && cinemaRand.value) {\n" +
      "            textareaActive.classList.remove('active');\n" +
      "            var cinemaText = reportItemActive.dataset.cinemaText + ' | ' + textareaActive.value + '\\n' + cinemaUrl;\n" +
      "            textareaActive.value = cinemaText.replace(/\\\\n/g, '\\n');\n" +
      "            cinemaMessage = textareaActive;\n" +
      '            var cinemaHttp = new XMLHttpRequest();\n' +
      "            cinemaHttp.open('POST', '/telegram/message', true);\n" +
      "            cinemaHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');\n" +
      '            cinemaHttp.onreadystatechange = function() {\n' +
      '                if(cinemaHttp.readyState === 4 && cinemaHttp.status === 200) {\n' +
      '                    var cinemaSuccess = JSON.parse(cinemaHttp.responseText);\n' +
      "                    if (cinemaSuccess && cinemaSuccess.color && cinemaSuccess.color === 'green') {\n" +
      "                        document.querySelectorAll('.cinemaModal-message')\n" +
      '                        .forEach((item, i) => {\n' +
      "                            item.value = '';\n" +
      '                        });\n' +
      "                        document.querySelector('.cinemaModal-rand').value = '';\n" +
      "                        document.querySelector('.cinemaModal-name')\n" +
      "                        .innerHTML = '<span style=\"color:' + cinemaSuccess.color + '\">' + cinemaSuccess.message + '</span>';\n" +
      '                        setTimeout(function() {\n' +
      "                            closeReportOverlay();\n" +
      '                        }, 2000);\n' +
      "                    } else if (cinemaSuccess && cinemaSuccess.color && cinemaSuccess.color === 'red') {\n" +
      "                        document.querySelector('.cinemaModal-name')\n" +
      "                        .innerHTML = '<span style=\"color:' + cinemaSuccess.color + '\">' + cinemaSuccess.message + '</span>';\n" +
      '                    } else {\n' +
      "                        document.querySelector('.cinemaModal-name')\n" +
      "                        .innerHTML = '<span style=\"color:red\">' + cinemaLang.error + '</span>';\n" +
      '                    }\n' +
      '                }\n' +
      '            }\n' +
      "            cinemaHttp.send('message=' + encodeURIComponent(cinemaMessage.value) + '&rand=' + cinemaRand.value);\n" +
      "            console.log('Жалоба отправлена');\n" +
      '        } else {\n' +
      '            if (!cinemaMessage || !cinemaMessage.value) {\n' +
      "                document.querySelector('.cinemaModal-name')\n" +
      "                .innerHTML = '<span style=\"color:red\">' + cinemaLang.message + '</span>';\n" +
      '            }\n' +
      '            if (!cinemaRand || !cinemaRand.value) {\n' +
      "                document.querySelector('.cinemaModal-name')\n" +
      "                .innerHTML = '<span style=\"color:red\">' + cinemaLang.rand + '</span>';\n" +
      '            }\n' +
      "            console.log('Жалоба не отправлена');\n" +
      // "            console.log('1. reportItemActive.dataset.cinemaText: ' + reportItemActive.dataset.cinemaText);\n" +
      // "            console.log('2. cinemaText: ' + cinemaText);\n" +
      // "            console.log('3. textareaActive.placeholder: ' + textareaActive.placeholder);\n" +
      // "            console.log('4. textareaActive.value: ' + textareaActive.value);\n" +
      '        }\n' +
      '    });\n' +
      '\n' +
      "    divCinemaModalClose.addEventListener('click', function() {\n" +
      "        closeReportOverlay();\n" +
      '    });\n' +
      '    window.onclick = function(event) {\n' +
      '        if (event.target == psOverlayWrap) {\n' +
      "            closeReportOverlay();\n" +
      '        }\n' +
      '    }\n' +
      "    function closeReportOverlay() {\n" +
      "        psOverlayWrap.style.display = 'none';\n" +
      "        psReportContent.setAttribute('style', 'display: none');\n" +
      "        document.body.classList.remove('ps-body');\n" +
      '    }\n' +
      "    function resetTextarea(reportItemID, textareaID) {\n" +
      "        let reportItem_arr = document.querySelectorAll('.report-item');\n" +
      "        reportItem_arr.forEach((item, i) => {\n" +
      "            item.classList.remove('active');\n" +
      "        });\n" +
      "        let textArea_arr = document.querySelectorAll('#ps-report-text');\n" +
      "        textArea_arr.forEach((item, i) => {\n" +
      "            item.classList.remove('active');\n" +
      "            item.style.display = 'none';\n" +
      "        });\n" +
      "        reportItemID.classList.add('active');\n" +
      "        textareaID.classList.add('active');\n" +
      "        textareaID.style.display = 'block';\n" +
      '    }'
  );
});

router.get('/rand.js', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.header('Content-Type', 'text/javascript');
  if (!req.signedCookies || !req.signedCookies.CP_rand) {
    return res.send(
      'document.querySelector(".cinemaModal-math").innerHTML = "ERROR";'
    );
  }
  res.send(
    'document.querySelector(".cinemaModal-math").innerHTML = "' +
      req.signedCookies.CP_rand[0] +
      ' + ' +
      req.signedCookies.CP_rand[1] +
      '";'
  );
});

function getIp(req) {
  var ips = req.ips || [];
  var ip = '';
  if (req.header('x-forwarded-for')) {
    req
      .header('x-forwarded-for')
      .split(',')
      .forEach(function(one_ip) {
        if (ips.indexOf(one_ip.trim()) === -1) {
          ips.push(one_ip.trim());
        }
      });
  }
  if (req.header('x-real-ip')) {
    req
      .header('x-real-ip')
      .split(',')
      .forEach(function(one_ip) {
        if (ips.indexOf(one_ip.trim()) === -1) {
          ips.push(one_ip.trim());
        }
      });
  }
  if (req.connection.remoteAddress) {
    req.connection.remoteAddress.split(',').forEach(function(one_ip) {
      if (ips.indexOf(one_ip.trim()) === -1) {
        ips.push(one_ip.trim());
      }
    });
  }
  ips.forEach(function(one_ip) {
    if (ip) return;
    one_ip = one_ip.replace('::ffff:', '');
    if (
      one_ip !== '127.0.0.1' &&
      /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/.test(
        one_ip
      )
    ) {
      ip = one_ip;
    }
  });
  return ip;
}

function nums(i) {
  switch (i) {
    case 1:
      return '1⃣';
    case 2:
      return '2⃣';
    case 3:
      return '3⃣';
    case 4:
      return '4⃣';
    case 5:
      return '5⃣';
    case 6:
      return '6⃣';
    case 7:
      return '7⃣';
    case 8:
      return '8⃣';
    case 9:
      return '9⃣';
    default:
      return '#⃣';
  }
}

module.exports = router;
