# Bored SDK configuration

module BoredConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Bored",
        "slug" => "bored",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://www.boredapi.com/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "activity" => {},
        },
      },
      "entity" => {
        "activity" => {
          "fields" => [
            {
              "name" => "accessibility",
              "title" => "Accessibility",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Accessibility factor between 0 and 1 (0 being most accessible)",
              "format" => "double",
            },
            {
              "name" => "activity",
              "title" => "Activity",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Description of the activity",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "key",
              "title" => "Key",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Unique identifier for the activity",
            },
            {
              "name" => "link",
              "title" => "Link",
              "type" => "`$STRING`",
              "short" => "URL link with more information about the activity (may be empty)",
            },
            {
              "name" => "participants",
              "title" => "Participants",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Number of participants required",
            },
            {
              "name" => "price",
              "title" => "Price",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Price factor between 0 and 1 (0 being free)",
              "format" => "double",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Type of activity",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "activity",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/activity",
                  "segments" => [
                    {
                      "lit" => "activity",
                    },
                  ],
                  "parts" => [
                    "activity",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "maxaccessibility",
                        "orig" => "maxaccessibility",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "maxprice",
                        "orig" => "maxprice",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "minaccessibility",
                        "orig" => "minaccessibility",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "minprice",
                        "orig" => "minprice",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "participant",
                        "orig" => "participant",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "type",
                        "orig" => "type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "maxaccessibility",
                      "maxprice",
                      "minaccessibility",
                      "minprice",
                      "participant",
                      "type",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/activity/{key}",
                  "segments" => [
                    {
                      "lit" => "activity",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "activity",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "key" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    BoredFeatures.make_feature(name)
  end
end
