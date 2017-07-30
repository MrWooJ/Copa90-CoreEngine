var app = require('../../server/server')

module.exports = function(sequencer) {

	sequencer.resetAll = function(cb) {
		var client = app.models.client
		client.find(function(err, clientList) {
			if (err)
				return cb(err)
			for(var i = 0; i < clientList.length; i++) {
				clientList[i].sequencerModel.update({'counter': {}}, function(err, result) {
					if (err)
						return cb(err)
					if (i == clientList.length)
						return cb(null, 'successful')
				})
			}
		})
	}

  sequencer.remoteMethod('resetAll', {
    accepts: [],
    description: 'reset all users sequences counters',
    http: {
      path: '/resetAll',
      verb: 'POST',
      status: 200,
      errorStatus: 400
    },
    returns: {
      type: 'string',
      root: true
    }
  })

}
