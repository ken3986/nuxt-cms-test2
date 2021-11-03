const { createClient } = require('microcms-js-sdk')
require('dotenv').config()
const { API_KEY, SERVICE_DOMAIN } = process.env
export const client = createClient({
  serviceDomain: SERVICE_DOMAIN,
  apiKey: API_KEY,
})

export const apiConfig = {
  endpoint: 'note',
  limit: 12,
}
