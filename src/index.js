'use strict'

const debug = require('debug')('indexer')

class Indexer {
  constructor (options) {
    Object.assign(this, options)
  }

  start () {
    debug('start indexer %s/%s', this.index, this.type)

    this.ref.on('child_added', this.createIndex.bind(this))
    this.ref.on('child_changed', this.createOrUpdateIndex.bind(this))
    this.ref.on('child_removed', this.deleteIndex.bind(this))
  }

  stop () {
    debug('stop indexer %s/%s', this.index, this.type)

    this.ref.off()
  }

  createIndex (snap) {
    return this.client.exists({
      index: this.index,
      type: this.type,
      id: snap.key()
    })
    .then((exists) => !exists ? this.createOrUpdateIndex(snap) : debug('index already exist %s/%s/%s', this.index, this.type, snap.key()))
    .catch((err) => debug(err.message, err))
  }

  createOrUpdateIndex (snap) {
    debug('create or update index %s/%s/%s', this.index, this.type, snap.key())

    return this.client.index({
      index: this.index,
      type: this.type,
      id: snap.key(),
      body: snap.val()
    })
    .catch((err) => debug(err.message, err))
  }

  deleteIndex (snap) {
    debug('delete %s/%s/%s', this.index, this.type, snap.key())

    return this.client.delete({
      index: this.index,
      type: this.type,
      id: snap.key()
    })
    .catch((err) => debug(err.message, err))
  }
}

module.exports = Indexer
