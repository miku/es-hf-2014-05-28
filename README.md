Hackfest Elasticsearch May 2014
===============================

* At: 2014-05-28
* In: Berlin, Andreasst 10


Ideas
-----

An instant library catalog interface.

* backend: index records
* frontend: foundation, react


Implementation
--------------

See Ideas. Very basic example to familiarize with [completion suggester](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-suggesters-completion.html).
Applied to real library data, four indices with about 1M documents in total.

Indexed `input` are the full title and title word unigrams.

Main code is in [v1/build/instant.js](https://github.com/miku/elasticsearch-hackfest-2014-05-28/blob/master/v1/build/instant.js).


Observations and Questions
--------------------------

* Super fast!
* Fuzzy matching can be nice, but can also hide "better" hits.
* Can use simple analyzer and add more tokens to `input`.
* Experiment more with different `input`, e.g. word bigrams, ...

* Is it feasible to use the fast completion suggester as a hook and load more info in subsequent request?
* How to prevent too much flickering? Query Throttling?
* How to make React frontend mobile friendly?
* ...


See it in Action
----------------

A 30s screen recording: https://mediacru.sh/pKJBp3u4LMYO

Dev
---

Run on [localhost:8000](http://localhost:8000):

    $ python -m SimpleHTTPServer
    Serving HTTP on 0.0.0.0 port 8000 ...

to serve up content, and

    $ jsx --watch src/ build/

to compile JSX (`npm install -g react-tools`) on file changes.
