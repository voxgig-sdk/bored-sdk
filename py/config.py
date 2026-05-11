# Bored SDK configuration


def make_config():
    return {
        "main": {
            "name": "Bored",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://www.boredapi.com/api",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "activity": {},
            },
        },
        "entity": {
      "activity": {
        "fields": [
          {
            "name": "accessibility",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "activity",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "key",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "link",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "participant",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "price",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
        ],
        "name": "activity",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "maxaccessibility",
                      "orig": "maxaccessibility",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "maxprice",
                      "orig": "maxprice",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "minaccessibility",
                      "orig": "minaccessibility",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "minprice",
                      "orig": "minprice",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "participant",
                      "orig": "participant",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/activity",
                "parts": [
                  "activity",
                ],
                "select": {
                  "exist": [
                    "maxaccessibility",
                    "maxprice",
                    "minaccessibility",
                    "minprice",
                    "participant",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/activity/{key}",
                "parts": [
                  "activity",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "key": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
