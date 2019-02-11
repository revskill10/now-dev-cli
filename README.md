## Now Dev CLI

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.2.4&x2=0)](https://www.npmjs.com/package/now-dev-cli)

A development server for Now V2 (for NextJS applications)

## Installation

```
npm i -g now-dev-cli
```

## Usage

Step 1: Create your own `now.config.js`:

```js
const buildTypes = [
  "@now/next",
  "@now/static"
]
const builds = [
  {
    src: "next.config.js", use: buildTypes[0]
  },
  {
    src: "static", use: buildTypes[1]
  }
]

const nextRoutes = ['/about'].map(function(item, index) {
  return {
    src: item,
    dest: item,
    build: buildTypes[0],
  }
})

const deployConfig = {
  version: 2,
  name: "next-routes-middleware",
  public: true,
  alias: "next-routes-middleware"
}


const patterns = {
  first: "(?<first>.*)",
  uuid: "(?<uuid>[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}",
  slug:"(?<slug>[^/]*)",
  year:"(?<year>[0-9]{4})",
  month:"(?<month>[0-9]{2})",
  day:"(?<day>[0-9]{2})"
}

const routes = [
  {
    src: "/favicon.ico",
    dest: "static/favicon.ico",
    build: buildTypes[0],
  },
  ...nextRoutes,
  { 
    src: `/w/${patterns.first}`, 
    dest: "/work?slug=${first}",
    build: buildTypes[0],
  },
  { 
    src: `/resource/${patterns.uuid}`, 
    dest: "/complex?id=${uuid}",
    build: buildTypes[0],
  },
  { 
    src: `/t/${patterns.slug}/${patterns.year}-${patterns.month}-${patterns.day}`, 
    dest: "/more_complex?day=${day}&month=${month}&year=${year}&slug=${slug}" ,
    build: buildTypes[0],
  },
  { src: "/", dest: "/index", build: buildTypes[0], }
]


module.exports = {
  ...deployConfig,
  patterns,
  builds,
  routes,
}

```
Step 2: Run `now-dev` to serve your NextJS application

You can also provide `-prefix <your prefix>` to produce prefixed routes in a monorepo application

Compiled JSON file:


```json
{
  "version": 2,
  "name": "next-routes-middleware",
  "public": true,
  "alias": "next-routes-middleware",
  "patterns": {
    "first": "(?<first>.*)",
    "uuid": "(?<uuid>[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}",
    "slug": "(?<slug>[^/]*)",
    "year": "(?<year>[0-9]{4})",
    "month": "(?<month>[0-9]{2})",
    "day": "(?<day>[0-9]{2})"
  },
  "builds": [
    {
      "src": "next.config.js",
      "use": "@now/next"
    },
    {
      "src": "static",
      "use": "@now/static"
    }
  ],
  "routes": [
    {
      "src": "/favicon.ico",
      "dest": "static/favicon.ico"
    },
    {
      "src": "/about",
      "dest": "/about"
    },
    {
      "src": "/w/(?<first>.*)",
      "dest": "/work?slug=$first"
    },
    {
      "src": "/resource/(?<uuid>[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}",
      "dest": "/complex?id=$uuid"
    },
    {
      "src": "/t/(?<slug>[^/]*)/(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})",
      "dest": "/more_complex?day=$day&month=$month&year=$year&slug=$slug"
    },
    {
      "src": "/",
      "dest": "/index"
    }
  ]
}
```


