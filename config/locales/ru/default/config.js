module.exports = {
    "database": {
        "host": "localhost",
        "port": 3306,
        "all_movies": "example.com",
        "key": "FREE",
        "date": ""
    },
    "protocol": "http://",
    "subdomain": "",
    "botdomain": "",
    "botdomains": "",
    "domain": "example.com",
    "bomain": "",
    "alt": {
        "botdomain": "",
        "bomain": ""
    },
    "ru": {
        "domain": "",
        "subdomain": "",
        "bomain": "",
        "botdomain": "",
        "random": 0
    },
    "mirrors": [],
    "rotate": {
        "list": [],
        "area": ["domain.for.bots", "domain2.for.bots", "domain.for.ru.bots"]
    },
    "dns": {
        "cloudflare": {
            "email": "",
            "key": "",
            "proxied": "true"
        }
    },
    "realtime": {
        "only_realtime": 0
    },
    "bots": [
        "google ~ googlebot.com,google.com ~ ~ Fake Google Bot!",
        "yandex. ~ yandex.ru,yandex.net,yandex.com ~ ~ Fake Yandex Bot!",
        "bing ~ search.msn.com ~ ~ Fake Bing Bot!",
        "yahoo ~ crawl.yahoo.net ~ ~ Fake Yahoo Bot!",
        "baidu ~ baidu.com,baidu.jp ~ ~ Fake Baidu Bot!",
        "duckduckgo ~ ~ 20.191.45.212,23.21.227.69,40.88.21.235,50.16.241.113,50.16.241.114,50.16.241.117,50.16.247.234,52.204.97.54,52.5.190.19,54.197.234.188,54.208.100.253,54.208.102.37,107.21.1.8 ~ Fake DuckDuckGo Bot!",
        "mail.ru ~ mail.ru ~ ~ Fake Mail Bot!"
    ],
    "user_bot": 0,
    "defense": {
        "domain": 2,
        "domain_key": 2,
        "domain_ex": ["domain.for.people", "domain.for.ru.people", "domain.for.mobile", "domain.for.tv", "domain.for.app", "domain.for.ftp", "domain.for.www"],
        "agent": 0,
        "message": "Мы заметили подозрительную активность, пожалуйста, пройдите проверку."
    },
    "blacklist": 0,
    "email": "support@example.com",
    "theme": "default",
    "country": "RU",
    "language": "ru",
    "random": 0,
    "homepage": "example.com",
    "redirect": {
        "from": [],
        "to": []
    },
    "geolite2": {
        "countries": ["Netherlands"],
        "ips": []
    },
    "image": {
        "save": 1
    },
    "cache": {
        "time": 3600,
        "ver": 0
    },
    "pagespeed": 0,
    "loadavg": {
        "one": 2400,
        "five": 1800,
        "fifteen": 1200,
        "message": "Сервер перегружен на [percent] пожалуйста зайдите позже."
    },
    "publish": {
        "start": 298,
        "stop": 10000000,
        "every": {
            "hours": 0,
            "movies": 0
        },
        "text": 0,
        "required": [
            "poster",
            "title_ru"
        ],
        "thematic": {
            "type": "",
            "year": "",
            "genre": "",
            "country": "",
            "actor": "",
            "director": "",
            "query_id": "",
            "search": "",
            "kp_vote": 0,
            "imdb_vote": 0
        },
        "indexing": {
            "condition": ""
        }
    },
    "default": {
        "count": 15,
        "sorting": "imdb-vote-up",
        "sorting_search": "",
        "pages": 4,
        "lastpage": 0,
        "days": 0,
        "image": "/themes/default/public/desktop/img/player.png",
        "votes": {
            "kp": 5000,
            "imdb": 5000
        },
        "people_image": 0,
        "people_image_domain": "",
        "donotuse": ["actor", "director", "search"],
        "categories": {
            "countries": ["США", "Россия", "СССР", "Индия", "Франция", "Япония", "Великобритания", "Испания", "Италия", "Канада"],
            "genres": ["аниме", "биография", "боевик", "вестерн", "военный", "детектив", "детский", "документальный", "драма", "игра", "история", "комедия", "концерт", "короткометражка", "криминал", "мелодрама", "музыка", "мультфильм", "мюзикл", "новости", "приключения", "реальное ТВ", "семейный", "спорт", "ток-шоу", "триллер", "ужасы", "фантастика", "фильм-нуар", "фэнтези", "церемония"],
            "years": ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000"]
        },
        "types": {
            "movie": "!мультфильм !аниме !короткометражка !шоу !новости !реальное !церемония !концерт !детский !документальный",
            "serial": "!аниме !короткометражка",
            "mult": "мультфильм | детский !аниме !короткометражка",
            "multserial": "мультфильм | детский !аниме !короткометражка",
            "anime": "мультфильм | аниме",
            "anime_country": "Япония",
            "tv": "шоу | новости | реальное | церемония | концерт"
        },
        "moment": "DD MMM YYYY",
        "loc": 2000,
        "tag": 2000,
        "tags": {
            "list": ["year", "genre"],
            "format": "[Type] [year] [genre] [country]"
        }
    },
    "movies": {
        "cron": [
            "# Заполнение с API Collaps",
            "0 ~ https://api.bhcesh.me/list?token=4c250f7ac0a8c8a658c789186b9a58a5&limit=99 ~ results.0.id ~ https://apicollaps.cc/franchise/details?token=4c250f7ac0a8c8a658c789186b9a58a5&id=[id] ~ kinopoisk_id <> kp_id ~ imdb_id <> custom.imdb_id ~ name <> title_ru ~ name_eng <> title_en ~ year <> year ~ type <> type ~ quality <> quality ~ premier <> premiere ~ description <> description ~ country <> country <> <> <> Object.values(_OBJECT_) ~ genre <> genre <> <> <> Object.values(_OBJECT_) ~ director.0 <> director ~ actors.0 <> actor <> 5 ~ actors_dubl.0 <> custom.actors_dubl <> 5 ~ voiceActing <> translate <> 1 ~ id <> custom.movie_id ~ world_art_id <> custom.wa_id ~ \"1\" <> poster ~ type <> custom.type",
            "# Заполнение с API Kodik",
            "0 ~ http://kodikapi.com/list?limit=100&with_material_data=true&token=41dd95f84c21719b09d6c71182237a25 ~ results ~ ~ kinopoisk_id <> kp_id ~ material_data.title <> title_ru ~ material_data.title_en <> title_en ~ material_data.year <> year ~ material_data.description <> description ~ material_data.poster_url <> poster ~ material_data.screenshots <> pictures ~ material_data.countries <> country ~ material_data.genres <> genre ~ material_data.premiere_world <> premiere ~ material_data.actors <> actor ~ material_data.directors <> director ~ type <> type",
            "# Заполнение с API Alloha фильмы",
            "0 ~ https://api.alloha.tv/?token=de19b0b4e75ce15a9be8e63c0f5858&order=date&list=movie ~ data.0.id_kp ~ https://api.alloha.tv/?token=04941a9a3ca3ac16e2b4327347bbc1&kp=[id] ~ data.id_kp <> kp_id ~ data.id_imdb <> custom.imdb_id ~ data.id_tmdb <> custom.tmdb_id ~ data.id_world_art <> custom.wa_id ~ data.name <> title_ru ~ data.original_name <> title_en ~ data.year <> year ~ \"movie\" <> type ~ data.quality <> quality <> 1 <> <> \"_VALUE_\".split(\",\") ~ data.translation <> translate <> 1 <> <> \"_VALUE_\".split(\",\") ~ data.premiere <> premiere ~ data.description <> description ~ data.country <> country ~ data.genre <> genre <> <> <> \"_VALUE_\".split(\",\") ~ data.directors <> director <> <> <> \"_VALUE_\".split(\",\") ~ data.actors <> actor <> 5 <> <> \"_VALUE_\".split(\",\") ~ \"1\" <> poster",
            "# Заполнение с API Alloha сериалы",
            "0 ~ https://api.alloha.tv/?token=de19b0b4e75ce15a9be8e63c0f5858&order=date&list=serial ~ data.0.id_kp ~ https://api.alloha.tv/?token=04941a9a3ca3ac16e2b4327347bbc1&kp=[id] ~ data.id_kp <> kp_id ~ data.id_imdb <> custom.imdb_id ~ data.id_tmdb <> custom.tmdb_id ~ data.id_world_art <> custom.wa_id ~ data.name <> title_ru ~ data.original_name <> title_en ~ data.year <> year ~ \"serial\" <> type ~ data.quality <> quality <> 1 <> <> \"_VALUE_\".split(\",\") ~ data.translation <> translate <> 1 <> <> \"_VALUE_\".split(\",\") ~ data.premiere <> premiere ~ data.description <> description ~ data.country <> country ~ data.genre <> genre <> <> <> \"_VALUE_\".split(\",\") ~ data.directors <> director <> <> <> \"_VALUE_\".split(\",\") ~ data.actors <> actor <> 5 <> <> \"_VALUE_\".split(\",\") ~ \"1\" <> poster",
            "# Заполнение рейтинга КиноПоиск и IMDb, напрямую с КиноПоиска.",
            "0 ~ db ~ kp_id ~ https://rating.kinopoisk.ru/[id].xml ~ rating.kp_rating._attributes.num_vote <> kp_vote ~ rating.kp_rating._text <> kp_rating ~ rating.imdb_rating._attributes.num_vote <> imdb_vote ~ rating.imdb_rating._text <> imdb_rating"
        ],
        "proxy": [],
        "cookies": "",
        "skip": [],
        "id": "kp_id"
    },
    "codes": {
        "head": "",
        "footer": "<script>window.lazyLoadOptions = {};</script>\n<script async src='https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.3.0/dist/lazyload.min.js'></script>\n\n<!-- СКРИПТ ЗАМЕНЫ ПОСТЕРОВ -->\n<script>\ndocument.addEventListener('DOMContentLoaded', () => {\nsetTimeout(function(){\n  (function() {\n    var dataAllSrc = document.querySelectorAll('[data-cinemapress-src],[data-cinemapress-bg-src]');\n    var dataAllSrcCount = (dataAllSrc && dataAllSrc.length) || 0;\n    if (!dataAllSrcCount) return;\n    var dataAllSrcCountComp = 0;\n    var fSrc = {\n      'dataCountImage': function() {\n        dataAllSrcCountComp = dataAllSrcCountComp+1;\n        if (dataAllSrcCount && dataAllSrcCountComp >= dataAllSrcCount) {\n          dataAllSrcCount = 0;\n          var st;\n          window.addEventListener('load', function() {\n            clearTimeout(st);\n            fSrc['checkLoad']('dataSetImage');\n          });\n          st = setTimeout(function() {\n            fSrc['checkLoad']('dataSetImage');\n          }, 5000);\n        }\n      },\n      'dataSetImage': function(el) {\n        var src = el.dataset.cinemapressSrc;\n        var bgSrc = el.dataset.cinemapressBgSrc;\n        if (!src && !bgSrc) return;\n        var img = new Image();\n        img.src = src ? src : bgSrc;\n        img.onload = function() {\n          if (src) { el.src = src; }\n          else { el.style.backgroundImage = 'url(\"' + bgSrc + '\")';}\n        }\n      },\n      'checkLoad': function(fn) {\n        if (!dataAllSrc) return;\n        dataAllSrc.forEach(function(src) {\n          if (typeof src.complete === 'undefined' || src.complete) {\n            fSrc[fn](src);\n          } else {\n            src.addEventListener('load', function() {\n              fSrc[fn](this);\n            }, { once: true });\n          }\n        });\n      }\n    }\n    fSrc['checkLoad']('dataCountImage');\n  })();\n}, 3500); // время указано в мс = 0,001 секунды, изменить по вкусу\n});\n</script",
        "robots": "User-agent: *\nDisallow: /\nDisallow: /type/*/*\nDisallow: /type-*/*\nDisallow: /movie/*/*\nDisallow: /movie-*/*\nDisallow: /year/*/*\nDisallow: /year-*/*\nDisallow: /genre/*/*\nDisallow: /genre-*/*\nDisallow: /country/*/*\nDisallow: /country-*/*\nDisallow: /director/*/*\nDisallow: /director-*/*\nDisallow: /actor/*/*\nDisallow: /actor-*/*\nDisallow: /search\nDisallow: /*?sorting*\nDisallow: /*?tag*\nDisallow: /*?q*\nDisallow: /*?random*\nDisallow: /*?PageSpeed*\nDisallow: /*?desktop*\nDisallow: /*?year*\nDisallow: /*?genre*\nDisallow: /*?country*\nDisallow: /iframe\nDisallow: /noindex\nDisallow: /mobile-version/type/*/*\nDisallow: /mobile-version/type-*/*\nDisallow: /mobile-version/movie/*/*\nDisallow: /mobile-version/movie-*/*\nDisallow: /mobile-version/year/*/*\nDisallow: /mobile-version/year-*/*\nDisallow: /mobile-version/genre/*/*\nDisallow: /mobile-version/genre-*/*\nDisallow: /mobile-version/country/*/*\nDisallow: /mobile-version/country-*/*\nDisallow: /mobile-version/director/*/*\nDisallow: /mobile-version/director-*/*\nDisallow: /mobile-version/actor/*/*\nDisallow: /mobile-version/actor-*/*\nDisallow: /mobile-version/search\nDisallow: /mobile-version/*?sorting*\nDisallow: /mobile-version/*?tag*\nDisallow: /mobile-version/*?q*\nDisallow: /mobile-version/*?random*\nDisallow: /mobile-version/*?PageSpeed*\nDisallow: /mobile-version/*?desktop*\nDisallow: /mobile-version/*?year*\nDisallow: /mobile-version/*?genre*\nDisallow: /mobile-version/*?country*\nDisallow: /mobile-version/iframe\nDisallow: /mobile-version/noindex\nDisallow: /tv-version\nDisallow: /admin*"
    },
    "index": {
        "type": {
            "name": "Лучшие [type]",
            "keys": "",
            "sorting": "imdb-rating-up",
            "count": 15,
            "order": 2
        },
        "year": {
            "name": "Фильмы [year] года",
            "keys": "2024",
            "sorting": "premiere-up",
            "count": 15,
            "order": 3
        },
        "genre": {
            "name": "Фильмы в жанре [genre]",
            "keys": "",
            "sorting": "imdb-vote-up",
            "count": 10,
            "order": 4
        },
        "country": {
            "name": "Фильмы из страны [country]",
            "keys": "",
            "sorting": "imdb-rating-up",
            "count": 10,
            "order": 5
        },
        "actor": {
            "name": "Лучшие фильмы [actor]",
            "keys": "",
            "sorting": "imdb-vote-up",
            "count": 10,
            "order": 6
        },
        "director": {
            "name": "Лучшие фильмы [director]",
            "keys": "",
            "sorting": "imdb-vote-up",
            "count": 10,
            "order": 7
        },
        "ids": {
            "name": "Новые фильмы",
            "keys": "",
            "count": 10,
            "order": 1
        },
        "count": {
            "type": "year",
            "key": "2024",
            "sorting": "premiere-up"
        },
        "link": 0
    },
    "titles": {
        "index": "Информационный каталог фильмов",
        "year": "Фильмы [year] года [sorting] [page]",
        "years": "Фильмы по годам",
        "genre": "Фильмы в жанре [genre] [sorting] [page]",
        "genres": "Фильмы по жанрам",
        "country": "Фильмы из страны [country] [sorting] [page]",
        "countries": "Фильмы по странам",
        "actor": "Фильмы с участием [actor] [sorting] [page]",
        "actors": "Самые популярные актеры",
        "director": "Фильмы которые срежиссировал [director] [sorting] [page]",
        "directors": "Самые популярные режиссеры",
        "type": "[Type] [year] [genre] [country] [sorting] [page]",
        "search": "(X) { [Type] +? [year] +? [Genre] +? [Country] +? [sorting] [page] }\n(default) { Поиск фильма «[search]» [sorting] [page] }",
        "num": "на странице [num]",
        "movie": {
            "movie": "(фильмы) { Фильм «[title]» }\n(сериалы) { Сериал «[title]» }\n(мультфильмы) { Мультфильм «[title]» }\n(мультсериалы) { Мультсериал «[title]» }\n(аниме) { Аниме «[title]» }\n(передачи) { ТВ-передача «[title]» }\n(default) { «[title]» }",
            "online": "[title] онлайн",
            "download": "[title] скачать",
            "trailer": "[title] трейлер",
            "picture": "[title] кадры"
        },
        "sorting": {
            "kinopoisk-rating-up": "отсортировано по рейтингу КиноПоиска",
            "kinopoisk-rating-down": "отсортировано по рейтингу КиноПоиска",
            "imdb-rating-up": "отсортировано по рейтингу IMDb",
            "imdb-rating-down": "отсортировано по рейтингу IMDb",
            "kinopoisk-vote-up": "отсортировано по популярности на КиноПоиске",
            "kinopoisk-vote-down": "отсортировано по популярности на КиноПоиске",
            "imdb-vote-up": "отсортировано по популярности на IMDb",
            "imdb-vote-down": "отсортировано по популярности на IMDb",
            "year-up": "отсортировано по году",
            "year-down": "отсортировано по году",
            "premiere-up": "отсортировано по дате премьеры",
            "premiere-down": "отсортировано по дате премьеры"
        }
    },
    "h1": {
        "index": "Все фильмы в мире",
        "year": "Фильмы [year] года [sorting] [page]",
        "years": "Фильмы по годам",
        "genre": "Фильмы в жанре [genre] [sorting] [page]",
        "genres": "Фильмы по жанрам",
        "country": "Фильмы из страны [country] [sorting] [page]",
        "countries": "Фильмы по странам",
        "actor": "Фильмы с участием [actor] [sorting] [page]",
        "actors": "Самые популярные актеры",
        "director": "Фильмы которые срежиссировал [director] [sorting] [page]",
        "directors": "Самые популярные режиссеры",
        "type": "[Type] [year] [genre] [country] [sorting] [page]",
        "search": "(X) { [Type] +? [year] +? [Genre] +? [Country] +? [sorting] [page] }\n(default) { Поиск фильма «[search]» [sorting] [page] }",
        "num": "на странице [num]",
        "movie": {
            "movie": "[title]",
            "online": "[title] [year] онлайн",
            "download": "[title] [year] скачать",
            "trailer": "[title] [year] трейлер",
            "picture": "[title] [year] кадры"
        },
        "sorting": {
            "kinopoisk-rating-up": "отсортировано по рейтингу КиноПоиска",
            "kinopoisk-rating-down": "отсортировано по рейтингу КиноПоиска",
            "imdb-rating-up": "отсортировано по рейтингу IMDb",
            "imdb-rating-down": "отсортировано по рейтингу IMDb",
            "kinopoisk-vote-up": "отсортировано по популярности на КиноПоиске",
            "kinopoisk-vote-down": "отсортировано по популярности на КиноПоиске",
            "imdb-vote-up": "отсортировано по популярности на IMDb",
            "imdb-vote-down": "отсортировано по популярности на IMDb",
            "year-up": "отсортировано по году",
            "year-down": "отсортировано по году",
            "premiere-up": "отсортировано по дате премьеры",
            "premiere-down": "отсортировано по дате премьеры"
        }
    },
    "descriptions": {
        "index": "Сколько фильмов Вам удалось посмотреть на данный момент? Вероятней всего, довольно много, несколько сотен, а может и тысяч, если Вы заядлый киноман и не представляете себе вечер, без просмотра одного или нескольких кинолент. Либо Вы возможно очень любите сериалы и вечера проводите за просмотром нескольких серий увлекательного сериала. Как бы там ни было, Мы очень рады что Вы выбрали Наш сайт, как площадку для обсуждения и дискуссий с такими же кинолюбителями, как и Вы. Усаживайтесь поудобней, заварите чаю и да начнётся <span style='text-decoration:line-through'>срач</span> критика :)",
        "year": "Фильмы [year] года",
        "years": "Фильмы по годам",
        "genre": "Фильмы в жанре [genre]",
        "genres": "Фильмы по жанрам",
        "country": "Фильмы из страны [country]",
        "countries": "Фильмы по странам",
        "actor": "Фильмы с участием [actor]",
        "actors": "Самые популярные актеры",
        "director": "Фильмы которые срежиссировал [director]",
        "directors": "Самые популярные режиссеры",
        "type": "[Type] [year] [genre] [country]",
        "search": "(X) { [Type] +? [year] +? [Genre] +? [Country] }\n(default) { Поиск фильма «[search]» }",
        "movie": {
            "movie": "Картина «[title]» была выпущена в [year] году и сразу завоевала внимание зрителей в разных [уголках Земли|частях планеты]. Киноленты из жанра [genre] всегда пользовались особой популярностью, к тому же, когда их снимают такие именитые режиссеры, как [director]. Страна, которая приложила руку к этому кинопроизведению считается [country], потому зрители уже могут приблизительно представить уровень [красочности|логики|картинки|искусства] по аналогичным творениям.",
            "online": "[title] онлайн",
            "download": "[title] скачать",
            "trailer": "[title] трейлер",
            "picture": "[title] кадры"
        }
    },
    "sorting": {
        "kinopoisk-rating-up": "По рейтингу КП ⬆",
        "kinopoisk-rating-down": "По рейтингу КП ⬇",
        "imdb-rating-up": "По рейтингу IMDb ⬆",
        "imdb-rating-down": "По рейтингу IMDb ⬇",
        "kinopoisk-vote-up": "По популярности КП ⬆",
        "kinopoisk-vote-down": "По популярности КП ⬇",
        "imdb-vote-up": "По популярности IMDb ⬆",
        "imdb-vote-down": "По популярности IMDb ⬇",
        "year-up": "По году ⬆",
        "year-down": "По году ⬇",
        "premiere-up": "По дате премьеры ⬆",
        "premiere-down": "По дате премьеры ⬇"
    },
    "urls": {
        "prefix_id": "id",
        "unique_id": 0,
        "separator": "-",
        "translit": 0,
        "translit_from": "щ ш ч ц ю я ё ж ъ ы э а б в г д е з и й к л м н о п р с т у ф х ь",
        "translit_to": "shh sh ch c yu ya yo zh 1 y 3 a b v g d e z i j k l m n o p r s t u f x 6",
        "translit_lower_case": 0,
        "movie_url": "[prefix_id][separator][title]",
        "movie": "movie",
        "year": "year",
        "genre": "genre",
        "country": "country",
        "actor": "actor",
        "director": "director",
        "type": "type",
        "search": "search",
        "sitemap": "sitemap",
        "admin": "admin-secret",
        "types": {
            "serial": "сериалы",
            "movie": "фильмы",
            "mult": "мультфильмы",
            "multserial": "мультсериалы",
            "tv": "передачи",
            "anime": "аниме"
        },
        "movies": {
            "online": "",
            "download": "",
            "trailer": "",
            "picture": ""
        },
        "noindex": "",
        "slash": "/"
    },
    "l": {
        "more": "Подробнее",
        "home": "Главная",
        "information": "Информация",
        "online": "Онлайн",
        "download": "Скачать",
        "trailer": "Трейлер",
        "picture": "Кадры",
        "episode": "Серия",
        "movies": "Фильмы",
        "series": "Сериалы",
        "cartoons": "Мультфильмы",
        "animated": "Мультсериалы",
        "tv": "ТВ",
        "anime": "Аниме",
        "collection": "Коллекция",
        "collections": "Коллекции",
        "season": "Сезон",
        "year": "Год",
        "years": "Годы",
        "genre": "Жанр",
        "genres": "Жанры",
        "actor": "Актер",
        "actors": "Актеры",
        "director": "Режиссер",
        "directors": "Режиссеры",
        "country": "Страна",
        "countries": "Страны",
        "quality": "Качество",
        "translate": "Перевод",
        "premiere": "Премьера",
        "rating": "Рейтинг",
        "kp": "КиноПоиск",
        "imdb": "IMDb",
        "episodes": "серии",
        "storyline": "Описание",
        "later": "Досмотреть позже",
        "continue": "Продолжить",
        "saved": "Сохранено",
        "allCategories": "Все категории",
        "allYears": "Все годы",
        "allGenres": "Все жанры",
        "allCountries": "Все страны",
        "allActors": "Все актеры",
        "allDirectors": "Все режиссеры",
        "watched": "Вы недавно смотрели",
        "search": "Поиск",
        "share": "Поделиться",
        "subscribe": "Подписаться",
        "vk": "ВКонтакте",
        "facebook": "facebook",
        "twitter": "Twitter",
        "google": "Google",
        "telegram": "Telegram",
        "youtube": "YouTube",
        "instagram": "Instagram",
        "up": "Вверх",
        "soon": "Скоро выйдут",
        "contacts": "Контакты",
        "news": "Новости",
        "menu": "Меню",
        "comments": "Комментарии",
        "movieTitle": "Название фильма",
        "votes": "голосов",
        "hide": "Скрыть",
        "navigation": "Навигация",
        "and": "и",
        "overall": "Общий",
        "premieres": "Премьеры",
        "popular": "Популярные",
        "top": "Топ",
        "sorting": "Сортировка",
        "tags": "Теги",
        "mentions": "Упоминания",
        "said": "сказал(а)",
        "full": "Полная версия",
        "original": "Оригинал",
        "submit": "Отправить",
        "like": "Нравится",
        "dislike": "Не нравится",
        "reply": "Ответить",
        "bold": "жирный",
        "italic": "курсив",
        "spoiler": "спойлер",
        "username": "Имя пользователя",
        "yes": "Да",
        "not": "Нет",
        "comment": "Комментировать...",
        "notFound": "Данной страницы нет на сайте. Возможно Вы ошиблись в URL или это внутренняя ошибка сайта, о которой администратор уже знает и предпринимает действия для её устранения.",
        "notMobile": "Мобильная версия сайта не активирована. Сайт адаптируется под экран и одинаково прекрасно отображается, как на больших экранах, так и на мобильных устройствах под управлением iOS, Android или WindowsPhone.",
        "notTv": "ТВ версия сайта не активирована.",
        "lucky": "Мне повезет!",
        "random": "Случайный фильм из категории",
        "results": "Все результаты",
        "moreEpisodes": "показать еще серии",
        "downloading": "Скачать",
        "safety": "Безопасно",
        "instruction": "Инструкция",
        "legal": "Изображения/видео могут быть защищены авторским правом. Подробнее…",
        "reset": "Сбросить",
        "filter": "Фильтр"
    }
};