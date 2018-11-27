var MongoClient = require('mongodb').MongoClient
const mongoConf = require('../../private/mongo.json').mongo
var localMongoUrl = ''
if (process.env.DOCKER === 'DOCKER') {
  localMongoUrl = 'mongodb://'+mongoConf.username+':'+mongoConf.password+'@'+mongoConf.dockerHost+':'+mongoConf.port+'/'+mongoConf.db+'?authSource=admin'
  console.log(localMongoUrl)
} else {
  localMongoUrl = 'mongodb://'+mongoConf.username+':'+mongoConf.password+'@'+mongoConf.host+':'+mongoConf.port+'/'+mongoConf.db+'?authSource=admin'
  console.log(localMongoUrl)
}
const startMongo = async function() {
    try {
        var db = await MongoClient.connect(localMongoUrl, {
          uri_decode_auth: true
        })
        console.log('Получилось подключиться к монге')
        return db
    } catch (err) {
        console.log('Не получилось подключиться к монге')
        console.log(err)
    }
}

module.exports = startMongo
