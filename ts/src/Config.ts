
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


  main = {
    name: 'Bored',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$NUMBER`"
        },
        {
          "name": "activity",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "link",
          "type": "`$STRING`"
        },
        {
          "name": "participants",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "price",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "type",
          "req": true,
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

