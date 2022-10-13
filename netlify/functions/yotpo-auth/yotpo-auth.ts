import { Handler } from '@netlify/functions'

import sha256 from 'crypto-js/sha256';

export const handler: Handler = async (event, context) => {
  const storeId = 'qkh5rzpFMqKn6r9wrsXjQIRYUOsBxEGxvitr0w4v'
  const customerId = '5969778737217'
  const tokenSecret = 'ZNDzLhi5IwqwzK10gLUti92ZRjDl5h3w'
  const email = 'ekenig+1@yotpo.com'
  const sentAt = '2022/10/13 11:26:19'
  const toSign = `${storeId}_${customerId}_${tokenSecret}_${sentAt}`
  const token = sha256(toSign)
  return {
    statusCode: 200,
    body: JSON.stringify({
      token: `${token}`,
      sentAt,
      customerId,
      email
    }),
  }
}
