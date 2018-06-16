require('dotenv').config()
var cloudinary = require('cloudinary')
cloudinary.config({ 
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
console.log( process.env.cloud_name,  process.env.api_key,  process.env.api_secret)
console.log(typeof process.env.cloud_name, typeof process.env.api_key, typeof process.env.api_secret)


exports.handler = function(event, context, callback) {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers':
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    }
    if (event.httpMethod === 'POST') {
        if (event.body) {
            console.log('body is ' + event.body)
            let body = JSON.parse(event.body)
            // let body = JSON.stringify(event)
            console.log(body)

            if (!body.password || !body.workId || body.password !== process.env.upload_password) {
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: 'wrong password'
                }) 
            } else {
                // get the api_secret (and keep it secret) 
                var apiSecret = process.env.api_secret; 
                let workId = body.workId
                // grab a current timestamp 
                var millisecondsToSeconds = 1000; 
                var timestamp = Math.round(Date.now() / millisecondsToSeconds); 
                // generate the signature using the current timestmap and any other desired Cloudinary params 
                var signature = cloudinary.utils.api_sign_request({ invalidate: true, timestamp: timestamp, public_id: workId + '' }, apiSecret); 
                // craft a signature payload to send to the client (timestamp and signature required, api_key either sent here or stored on client) 
                var payload = { 
                    signature, 
                    timestamp,
                    workId 
                }; 

                callback(null, {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(payload)
                }) 
            }

            // cloudinary.uploader.upload(
            //   event.body,
            //   function(result) { 
            //     console.log(result)
            //         callback(null, {
            //             statusCode: 200,
            //             headers,
            //             body:result
            //         })
            //     },
            //     {
            //         public_id: 'new-models',
            //         tags: ['special', 'for_homepage']
            //     }      
            // )
        } else {
          callback(null, {
            statusCode: 200,
            headers,
            body: '¯\\_(ツ)_/¯'
        })
      }
  } else {
    callback(null, {
      statusCode: 200,
      headers,
      body: ':)'
  })
}
}
