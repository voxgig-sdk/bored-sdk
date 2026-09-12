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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "format" => "double",
              "name" => "accessibility",
              "req" => true,
              "short" => "Accessibility factor between 0 and 1 (0 being most accessible)",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "activity",
              "req" => true,
              "short" => "Description of the activity",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "key",
              "req" => true,
              "short" => "Unique identifier for the activity",
              "type" => "`$STRING`",
            },
            {
              "name" => "link",
              "short" => "URL link with more information about the activity (may be empty)",
              "type" => "`$STRING`",
            },
            {
              "name" => "participants",
              "req" => true,
              "short" => "Number of participants required",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "double",
              "name" => "price",
              "req" => true,
              "short" => "Price factor between 0 and 1 (0 being free)",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "type",
              "req" => true,
              "short" => "Type of activity",
              "type" => "`$STRING`",
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
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "maxaccessibility",
                        "orig" => "maxaccessibility",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "maxprice",
                        "orig" => "maxprice",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "minaccessibility",
                        "orig" => "minaccessibility",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "minprice",
                        "orig" => "minprice",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "participant",
                        "orig" => "participant",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "type",
                        "orig" => "type",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/activity",
                  "segments" => [
                    {
                      "lit" => "activity",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "activity",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/activity/{key}",
                  "rename" => {
                    "param" => {
                      "key" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "activity",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "activity",
                    "{id}",
                  ],
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
