

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BoredSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ActivityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BORED_TEST_LIVE=TRUE.
  afterEach(liveDelay('BORED_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BoredSDK.test()
    const ent = testsdk.Activity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BORED_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'activity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accessibility":{"a":true,"fo":"double","h":"Accessibility","n":"accessibility","r":true,"sh":"Accessibility factor between 0 and 1 (0 being most accessible)","t":"`$NUMBER`","key$":"accessibility","index$":0},"activity":{"a":true,"h":"Activity","n":"activity","r":true,"sh":"Description of the activity","t":"`$STRING`","key$":"activity","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"key":{"a":true,"h":"Key","n":"key","r":true,"sh":"Unique identifier for the activity","t":"`$STRING`","key$":"key","index$":3},"link":{"a":true,"h":"Link","n":"link","r":false,"sh":"URL link with more information about the activity (may be empty)","t":"`$STRING`","key$":"link","index$":4},"participants":{"a":true,"h":"Participants","n":"participants","r":true,"sh":"Number of participants required","t":"`$INTEGER`","key$":"participants","index$":5},"price":{"a":true,"fo":"double","h":"Price","n":"price","r":true,"sh":"Price factor between 0 and 1 (0 being free)","t":"`$NUMBER`","key$":"price","index$":6},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"Type of activity","t":"`$STRING`","key$":"type","index$":7}},"id":{"field":"id","name":"id"},"name":"activity","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /activity","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"maxaccessibility","or":"maxaccessibility","r":false,"t":"`$NUMBER`","index$":0},{"a":true,"k":"query","n":"maxprice","or":"maxprice","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"k":"query","n":"minaccessibility","or":"minaccessibility","r":false,"t":"`$NUMBER`","index$":2},{"a":true,"k":"query","n":"minprice","or":"minprice","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"participant","or":"participant","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/activity","q":{"exist":["maxaccessibility","maxprice","minaccessibility","minprice","participant","type"]},"r":{},"s":[{"lit":"activity"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /activity/{key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/activity/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"s":[{"lit":"activity"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"activity","name__orig":"activity","Name":"Activity","name_":"activity","name-":"activity","NAME":"ACTIVITY","index$":0}, {"active":true,"entity":"activity","key$":"BasicActivityFlow","kind":"basic","name":"BasicActivityFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"activity_ref01","srcdatavar":"activity_ref01_data","suffix":"_dt0"},"m":{"id":"activity01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-activity_ref01"}}],"index$":0}]}, 'Activity', {"GET /activity":{"protocol":"http","operationId":"getRandomActivity","responses":{"200":{"description":"Successfully returned a random activity","content":{"application/json":{"schema":{"type":"object","properties":{"activity":{"description":"Description of the activity","key$":"activity","type":"string"},"type":{"description":"Type of activity","enum":["education","recreational","social","diy","charity","cooking","relaxation","music","busywork"],"key$":"type","type":"string"},"participants":{"description":"Number of participants required","key$":"participants","type":"integer"},"price":{"description":"Price factor between 0 and 1 (0 being free)","format":"double","key$":"price","type":"number"},"link":{"description":"URL link with more information about the activity (may be empty)","key$":"link","type":"string"},"key":{"description":"Unique identifier for the activity","key$":"key","type":"string"},"accessibility":{"description":"Accessibility factor between 0 and 1 (0 being most accessible)","format":"double","key$":"accessibility","type":"number"}},"required":["activity","type","participants","price","key","accessibility"],"x-ref":"#/components/schemas/Activity","index$":0},"example":{"activity":"Learn how to french braid hair","type":"education","participants":1,"price":0,"link":"","key":"4387026","accessibility":0.1}}}},"404":{"description":"No activity found with the specified parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"type","in":"query","description":"Type of activity (education, recreational, social, diy, charity, cooking, relaxation, music, busywork)","required":false,"schema":{"type":"string","enum":["education","recreational","social","diy","charity","cooking","relaxation","music","busywork"]},"index$":0},{"name":"participants","in":"query","description":"Number of participants for the activity","required":false,"schema":{"type":"integer","minimum":1},"index$":1},{"name":"minprice","in":"query","description":"Minimum price (0.0 to 1.0)","required":false,"schema":{"type":"number","format":"double","minimum":0,"maximum":1},"index$":2},{"name":"maxprice","in":"query","description":"Maximum price (0.0 to 1.0)","required":false,"schema":{"type":"number","format":"double","minimum":0,"maximum":1},"index$":3},{"name":"minaccessibility","in":"query","description":"Minimum accessibility (0.0 to 1.0)","required":false,"schema":{"type":"number","format":"double","minimum":0,"maximum":1},"index$":4},{"name":"maxaccessibility","in":"query","description":"Maximum accessibility (0.0 to 1.0)","required":false,"schema":{"type":"number","format":"double","minimum":0,"maximum":1},"index$":5}],"securitySource":"unspecified"},"GET /activity/{key}":{"protocol":"http","operationId":"getActivityByKey","responses":{"200":{"description":"Successfully returned the activity","content":{"application/json":{"schema":{"type":"object","properties":{"activity":{"description":"Description of the activity","key$":"activity","type":"string"},"type":{"description":"Type of activity","enum":["education","recreational","social","diy","charity","cooking","relaxation","music","busywork"],"key$":"type","type":"string"},"participants":{"description":"Number of participants required","key$":"participants","type":"integer"},"price":{"description":"Price factor between 0 and 1 (0 being free)","format":"double","key$":"price","type":"number"},"link":{"description":"URL link with more information about the activity (may be empty)","key$":"link","type":"string"},"key":{"description":"Unique identifier for the activity","key$":"key","type":"string"},"accessibility":{"description":"Accessibility factor between 0 and 1 (0 being most accessible)","format":"double","key$":"accessibility","type":"number"}},"required":["activity","type","participants","price","key","accessibility"],"x-ref":"#/components/schemas/Activity","index$":0},"example":{"activity":"Learn how to french braid hair","type":"education","participants":1,"price":0,"link":"","key":"4387026","accessibility":0.1}}}},"404":{"description":"Activity not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"key","in":"path","description":"Unique key identifier for the activity","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let activity_ref01_data = Object.values(setup.data.existing.activity)[0] as any

    // LOAD
    const activity_ref01_ent = client.Activity()
    const activity_ref01_match_dt0: any = {}
    activity_ref01_match_dt0.id = activity_ref01_data.id
    const activity_ref01_data_dt0 = (await activity_ref01_ent.load(activity_ref01_match_dt0)).data()
    assert(activity_ref01_data_dt0.id === activity_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/activity/ActivityTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = BoredSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['activity01','activity02','activity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BORED_TEST_ACTIVITY_ENTID': idmap,
    'BORED_TEST_LIVE': 'FALSE',
    'BORED_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BORED_TEST_ACTIVITY_ENTID']

  const live = 'TRUE' === env.BORED_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BORED_TEST_ACTIVITY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new BoredSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.BORED_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
