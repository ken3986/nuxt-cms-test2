const axios = require('axios')

exports.handler = async (event) => {
  const { id, draftKey } = event.queryStringParameters
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "id" query parameter',
      })
    }
  }
  return axios
    .get('https://' + 'teten-microcms-test'
    + '.microcms.io/api/v1/note'
    + '/'
    + `${id}`
    + '?'
    + `draftKey=${draftKey}`, {
      headers: { 'X-MICROCMS-API-KEY': 'e2d003f42ab74ce5afef740efd29a2c41d43' },
    })
      .then(({ data }) => ({
        statusCode: 200,
        body: JSON.stringify(data)
      }))
      .catch((error) => {
        console.log(error)
        return {
          statusCode: error.response.status,
          body: JSON.stringify(error.response.data)
        }
      })
}
