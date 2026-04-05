<?php

return [
    /**
     * Paths that should be excluded from CORS checks
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    /**
     * Allowed request methods
     */
    'allowed_methods' => ['*'],

    /**
     * Allowed request origins - Change this to your React app URL
     */
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173')),

    /**
     * Allowed request headers
     */
    'allowed_headers' => ['*'],

    /**
     * Exposed response headers
     */
    'exposed_headers' => ['Content-Range', 'X-Content-Range', 'X-Total-Count'],

    /**
     * Set the max age of the CORS preflight request (seconds)
     */
    'max_age' => 86400,

    /**
     * Supports credentials
     */
    'supports_credentials' => true,
];
