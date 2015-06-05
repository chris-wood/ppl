#!/bin/sh

# mongoimport --db ppl --collection authors --file authors.js
# mongoimport --db ppl --collection venues --file venues.js
mongoimport --db ppl --jsonArray --collection papers --file papers.js # --jsonArray handles \n characters
