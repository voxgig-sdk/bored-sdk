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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'name' => 'accessibility',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'activity',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'link',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'participants',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'price',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'type',
              'req' => true,
              'type' => '`$STRING`',
            ],
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
                  'parts' => [
                    'activity',
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
                  'parts' => [
                    'activity',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'key' => 'id',
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
