# Bored SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
          },
          {
            "name": "activity",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "link",
            "type": "`$STRING`",
          },
          {
            "name": "participants",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "price",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
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
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "maxprice",
                      "orig": "maxprice",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "minaccessibility",
                      "orig": "minaccessibility",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "minprice",
                      "orig": "minprice",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "participant",
                      "orig": "participant",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
