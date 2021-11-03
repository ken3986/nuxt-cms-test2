// const { client, apiConfig } = require('../utils/microcms')

const { default: axios } = require("axios")

exports.handler = async (event) => {
  const { q } = event.queryStringParameters
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "q" query parameter'
      })
    }
  }

  return axios
    .get('https://' + 'teten-microcms-test'
    + '.microcms.io/api/v1/note'
    // + '/'
    // + `${id}`
    + '?'
    + `q=${q}`, {
      headers: { 'X-MICROCMS-API-KEY': 'e2d003f42ab74ce5afef740efd29a2c41d43' },
    })
    .then((data) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    })
    .catch((error) => ({
      statusCode: 400,
      body: String(error)
    }))

  return client
    .get({
      endpoint: apiConfig.endpoint,
      queries:  { q }
    })
    .then((data) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    })
    .catch((error) => ({
      statusCode: 400,
      body: String(error)
    }))
}
