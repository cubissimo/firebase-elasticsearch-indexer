# firebase-elasticsearch-indexer

Library for indexing firebase data with elasticsearch client.

```javascript
var Firebase = require('firebase')
var Indexer = require('firebase-elasticsearch-indexer')
var Elasticsearch = require('elasticsearch')

var client = new Elasticsearch.Client({
  host: 'localhost:9200'
})

var ref = new Firebase('https://<YOUR_APP_ID>.firebaseio.com')

var indexer = new Indexer({
  ref: ref.child('articles'),
  index: 'myindex',
  type: 'articles',
  client
})

indexer.start()
```

Environment variable for indexer debug log: 

```
DEBUG=indexer
```

