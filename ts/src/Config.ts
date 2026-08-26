
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "req": true,
          "short": "Accessibility factor between 0 and 1 (0 being most accessible)",
          "type": "`$NUMBER`"
        },
        {
          "name": "activity",
          "req": true,
          "short": "Description of the activity",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "req": true,
          "short": "Unique identifier for the activity",
          "type": "`$STRING`"
        },
        {
          "name": "link",
          "short": "URL link with more information about the activity (may be empty)",
          "type": "`$STRING`"
        },
        {
          "name": "participants",
          "req": true,
          "short": "Number of participants required",
          "type": "`$INTEGER`"
        },
        {
          "name": "price",
          "req": true,
          "short": "Price factor between 0 and 1 (0 being free)",
          "type": "`$NUMBER`"
        },
        {
          "name": "type",
          "req": true,
          "short": "Type of activity",
          "type": "`$STRING`"
        }
      ],
      "name": "activity",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "maxaccessibility",
                    "orig": "maxaccessibility",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "maxprice",
                    "orig": "maxprice",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "minaccessibility",
                    "orig": "minaccessibility",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "minprice",
                    "orig": "minprice",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "participant",
                    "orig": "participant",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/activity",
              "parts": [
                "activity"
              ],
              "select": {
                "exist": [
                  "maxaccessibility",
                  "maxprice",
                  "minaccessibility",
                  "minprice",
                  "participant",
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/activity/{key}",
              "parts": [
                "activity",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
  config
}

