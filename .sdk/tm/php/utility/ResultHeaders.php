<?php
declare(strict_types=1);

// Bored SDK utility: result_headers

class BoredResultHeaders
{
    public static function call(BoredContext $ctx): ?BoredResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
