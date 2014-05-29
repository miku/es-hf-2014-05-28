README
======

Data resides on http://work:9200.

Use a few indices only: EBL, NEP, NL, LFER.

Suggestions
-----------

Inspect mapping:

    curl -X GET work:9200/ebl

Set mapping:

    curl -X PUT work:9200/ebl
    curl -X PUT work:9200/ebl/title/_mapping -d '{
      "title" : {
            "properties" : {
                "content": {
                    "properties": {
                        "245": {
                            "properties": {
                                "a" : {
                                    "type" : "string"
                                },
                                "suggest": {
                                    "type": "completion",
                                    "index_analyzer": "simple",
                                    "search_analyzer": "simple",
                                    "payloads": true
                                }
                            }
                        },
                        "100": {
                            "properties": {
                                "a" : {
                                    "type" : "string"
                                },
                                "suggest": {
                                    "type": "completion",
                                    "index_analyzer": "simple",
                                    "search_analyzer": "simple",
                                    "payloads": true
                                }
                            }
                        }
                    }
                }
            }
        }
    }'

Test suggest:

    curl -X POST 'work:9200/ebl,nep/_suggest?pretty' -d '{
        "title-suggest" : {
            "text" : "B",
            "completion" : {
                "field" : "content.245.suggest"
            }
        }
    }'

More than one index:

    curl -X POST 'work:9200/ebl,nep/_suggest?pretty' -d '{
        "title-suggest" : {
            "text" : "B",
            "completion" : {
                "field" : "content.245.suggest"
            }
        }
    }'
