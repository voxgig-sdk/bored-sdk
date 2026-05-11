<?php
declare(strict_types=1);

// Bored SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

BoredUtility::setRegistrar(function (BoredUtility $u): void {
    $u->clean = [BoredClean::class, 'call'];
    $u->done = [BoredDone::class, 'call'];
    $u->make_error = [BoredMakeError::class, 'call'];
    $u->feature_add = [BoredFeatureAdd::class, 'call'];
    $u->feature_hook = [BoredFeatureHook::class, 'call'];
    $u->feature_init = [BoredFeatureInit::class, 'call'];
    $u->fetcher = [BoredFetcher::class, 'call'];
    $u->make_fetch_def = [BoredMakeFetchDef::class, 'call'];
    $u->make_context = [BoredMakeContext::class, 'call'];
    $u->make_options = [BoredMakeOptions::class, 'call'];
    $u->make_request = [BoredMakeRequest::class, 'call'];
    $u->make_response = [BoredMakeResponse::class, 'call'];
    $u->make_result = [BoredMakeResult::class, 'call'];
    $u->make_point = [BoredMakePoint::class, 'call'];
    $u->make_spec = [BoredMakeSpec::class, 'call'];
    $u->make_url = [BoredMakeUrl::class, 'call'];
    $u->param = [BoredParam::class, 'call'];
    $u->prepare_auth = [BoredPrepareAuth::class, 'call'];
    $u->prepare_body = [BoredPrepareBody::class, 'call'];
    $u->prepare_headers = [BoredPrepareHeaders::class, 'call'];
    $u->prepare_method = [BoredPrepareMethod::class, 'call'];
    $u->prepare_params = [BoredPrepareParams::class, 'call'];
    $u->prepare_path = [BoredPreparePath::class, 'call'];
    $u->prepare_query = [BoredPrepareQuery::class, 'call'];
    $u->result_basic = [BoredResultBasic::class, 'call'];
    $u->result_body = [BoredResultBody::class, 'call'];
    $u->result_headers = [BoredResultHeaders::class, 'call'];
    $u->transform_request = [BoredTransformRequest::class, 'call'];
    $u->transform_response = [BoredTransformResponse::class, 'call'];
});
