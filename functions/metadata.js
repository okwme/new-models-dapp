
const Route = require('route-parser');
import {workIdFromTokenId, editionFromTokenId} from '../src/assets/utils'

exports.handler = function(event, context, callback) {
    let headers = {
        "Content-Type": "text/html; charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers':
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    }
    var route = new Route('/metadata/:tokenId');
    let result = route.match(event.path)
    let works = {
        "1" : {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            },
        },
        "2" : {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            }
        },
        "3" : {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            }
        },
        "4" : {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            }
        },
        "5" : {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            }
        }
    }

    if (result && result.tokenId && works[workIdFromTokenId(result.tokenId)]) {

        headers["Content-Type"] = "application/json; charset=utf-8"

        let tokenId = result.tokenId
        let workId = workIdFromTokenId(tokenId)
        let body = works[workId]
        body.meta.series = workId
        body.meta.edition = editionFromTokenId(tokenId) + '/100'
        body.image = 'https://res.cloudinary.com/dszcbwdrl/image/upload/' + workId
        body = JSON.stringify(body)
        callback(null, {
            statusCode: 200,
            headers,
            body
        })
    } else {
        callback(null, {
            statusCode: 404,
            headers,
            body: "¯\\_(ツ)_/¯"
        })
    }
}
