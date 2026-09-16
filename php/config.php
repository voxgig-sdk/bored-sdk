<?php
declare(strict_types=1);

// Bored SDK configuration

class BoredConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Bored",
                "slug" => "bored",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://www.boredapi.com/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "activity" => [],
                ],
            ],
            "entity" => [
        'activity' => [
          'fields' => [
            [
              'format' => 'double',
              'name' => 'accessibility',
              'req' => true,
              'short' => 'Accessibility factor between 0 and 1 (0 being most accessible)',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'activity',
              'req' => true,
              'short' => 'Description of the activity',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'req' => true,
              'short' => 'Unique identifier for the activity',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'link',
              'short' => 'URL link with more information about the activity (may be empty)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'participants',
              'req' => true,
              'short' => 'Number of participants required',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'double',
              'name' => 'price',
              'req' => true,
              'short' => 'Price factor between 0 and 1 (0 being free)',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'type',
              'req' => true,
              'short' => 'Type of activity',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'activity',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'maxaccessibility',
                        'orig' => 'maxaccessibility',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'maxprice',
                        'orig' => 'maxprice',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'minaccessibility',
                        'orig' => 'minaccessibility',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'minprice',
                        'orig' => 'minprice',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'participant',
                        'orig' => 'participant',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/activity',
                  'segments' => [
                    [
                      'lit' => 'activity',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'maxaccessibility',
                      'maxprice',
                      'minaccessibility',
                      'minprice',
                      'participant',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'activity',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/activity/{key}',
                  'rename' => [
                    'param' => [
                      'key' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'activity',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'activity',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return BoredFeatures::make_feature($name);
    }
}
