
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BoredSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = BoredSDK.test()
    equal(testsdk instanceof BoredSDK, true,
      'BoredSDK.test() must return a client synchronously')
  })

})
