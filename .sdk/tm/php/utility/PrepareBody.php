<?php
declare(strict_types=1);

// Bored SDK utility: prepare_body

class BoredPrepareBody
{
    public static function call(BoredContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
