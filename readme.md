# Rethink URL Shortener

https://drive.google.com/file/d/1t-h0blhJePqqwrOg7O5L3AV84yFnSRBv/view?usp=sharing

# Scope

(adjusted based on time constraint)

Must have:

- Ability to create unique, short URL from a given destination URL - done
- Redirect short URL to destination URL - done
- API documentation - in progress: needs to provide schema and examples
- Test coverage - in progress

Nice to have:

- In memory cache - in progress
- Anlytics on usage - not started
- Custom short URLs - not started
- Docker file for fast configurations and deployment - not started
- distributed servers and load balancing - not started

Not in scope:

- short urls suggestions

# run locally

- FORK this repo

# back-end

- `cd backend`
- update mongodb credentials in .env
- Add this line to nginx config

```
location ~* "^/[0-9a-zA-Z]{1,15}$"  {
	        rewrite ^/(.*)$ http://localhost:1337/shortLink/get/$1 redirect;
}
```

change port 1337 to process.env.PORT if neccesary

- run `npm install && node database/seed.js && npm start`
- documentation: localhost:1337/api-docs
- example usage:
  Create short link:
  `curl -H "Content-Type: application/json" -X POST -d '{"destinationURL":"aloha.com"}' http://localhost:1337/shortLink/create`

  Redirect to destinational URL:
  `curl -X GET http://localhost:1337/shortLink/get/hht`
  response: `Found. Redirecting to https://goplanatrip.com`

- testing: `npm test`

# front-end

- `cd frontend`
- run `npm install & npm start`

# TODO

(in addition to scope)

- return existing short url if destination url exisits
- clean and adequate success and error response and messages

# libraries used

[Swagger](https://swagger.io/solutions/api-documentation/) for API Documentation

[Mongoose](https://github.com/Automattic/mongoose) object modeling for Mongo

[mocha](https://github.com/mochajs/mocha), [chai](https://github.com/chaijs/chai), and [mongo-unit](https://www.npmjs.com/package/mongo-unit) with minimum set-up and fast in-memory database for testing
