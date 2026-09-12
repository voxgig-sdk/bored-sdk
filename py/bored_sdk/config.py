# Bored SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "slug": "bored",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "format": "double",
            "name": "accessibility",
            "req": True,
            "short": "Accessibility factor between 0 and 1 (0 being most accessible)",
            "type": "`$NUMBER`",
          },
          {
            "name": "activity",
            "req": True,
            "short": "Description of the activity",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "req": True,
            "short": "Unique identifier for the activity",
            "type": "`$STRING`",
          },
          {
            "name": "link",
            "short": "URL link with more information about the activity (may be empty)",
            "type": "`$STRING`",
          },
          {
            "name": "participants",
            "req": True,
            "short": "Number of participants required",
            "type": "`$INTEGER`",
          },
          {
            "format": "double",
            "name": "price",
            "req": True,
            "short": "Price factor between 0 and 1 (0 being free)",
            "type": "`$NUMBER`",
          },
          {
            "name": "type",
            "req": True,
            "short": "Type of activity",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "activity",
                  },
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
                "parts": [
                  "activity",
                ],
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
                "rename": {
                  "param": {
                    "key": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "activity",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "activity",
                  "{id}",
                ],
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
