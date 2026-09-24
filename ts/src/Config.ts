
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Bored',
        slug: "bored",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://www.boredapi.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        activity: {
        },
  
    }
  }


  entity = {
    "activity": {
      "fields": [
        {
          "name": "accessibility",
          "title": "Accessibility",
          "type": "`$NUMBER`",
          "req": true,
          "short": "Accessibility factor between 0 and 1 (0 being most accessible)",
          "format": "double"
        },
        {
          "name": "activity",
          "title": "Activity",
          "type": "`$STRING`",
          "req": true,
          "short": "Description of the activity"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "short": "Unique identifier for the activity"
        },
        {
          "name": "link",
          "title": "Link",
          "type": "`$STRING`",
          "short": "URL link with more information about the activity (may be empty)"
        },
        {
          "name": "participants",
          "title": "Participants",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of participants required"
        },
        {
          "name": "price",
          "title": "Price",
          "type": "`$NUMBER`",
          "req": true,
          "short": "Price factor between 0 and 1 (0 being free)",
          "format": "double"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "req": true,
          "short": "Type of activity"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "activity",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/activity",
              "segments": [
                {
                  "lit": "activity"
                }
              ],
              "parts": [
                "activity"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "maxaccessibility",
                    "orig": "maxaccessibility",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "maxprice",
                    "orig": "maxprice",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "minaccessibility",
                    "orig": "minaccessibility",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "minprice",
                    "orig": "minprice",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "participant",
                    "orig": "participant",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "maxaccessibility",
                  "maxprice",
                  "minaccessibility",
                  "minprice",
                  "participant",
                  "type"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/activity/{key}",
              "segments": [
                {
                  "lit": "activity"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "activity",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

