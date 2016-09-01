var aapi_model = {
    baseURL: 'https://analytics.api.brightcove.com/v1',
    endpointGroups: {
        report: {
            name: 'report',
            endpoints: [{
                name: 'Report',
                path: '/data',
                methods: ['GET'],
                pathparams: [],
                urlparams: ['account', 'dimensions', 'where', 'limit', 'offset', 'sort', 'fields', 'reconciled', 'from', 'to']
            }, {
                name: 'Available Date Range',
                path: '/data/status',
                methods: ['GET'],
                pathparams: [],
                urlparams: ['account', 'dimensions', 'where', 'limit', 'offset', 'sort', 'fields', 'reconciled', 'from', 'to']
            }]
        },
        engagement: {
            name: 'engagement',
            endpoints: [{
                name: 'Account engagement',
                path: '/accounts/{account}',
                methods: ['GET'],
                pathparams: ['account'],
                urlparams: ['from', 'to']
            }, {
                name: 'Player engagement',
                path: '/accounts/{account_id}/players/{player}',
                methods: ['GET'],
                pathparams: ['account', 'player'],
                urlparams: ['from', 'to']
            }, {
                name: 'Video engagement',
                path: '/accounts/{account_id}/videos/{video_id}',
                methods: ['GET'],
                pathparams: ['account', 'video'],
                urlparams: ['from', 'to']
            }]
        },
        video_data: {
            name: 'Video Data (alltime video views)',
            endpoints: [{
                path: '/alltime/accounts/{account}/videos/{video}',
                methods: ['GET'],
                pathparams: ['account', 'video'],
                urlparams: []
            }]
        }
    },
    pathparams: {
        account: {
            name: 'account',
            required: true,
            description: 'The account id you want to report on',
            values: 'An account id',
            default: 'none'
        },
        player: {
            name: 'player',
            required: true,
            description: 'The player id you want to report on',
            values: 'An player id',
            default: 'none'
        },
        video: {
            name: 'video',
            required: true,
            description: 'The video id you want to report on',
            values: 'An video id',
            default: 'none'
        }
    },
    urlparams: {
        account: {
            name: 'account',
            required: true,
            description: 'The accounts you want to report on',
            values: 'one or more account ids as a comma-delimited list',
            default: 'none'
        },
        dimensions: {
            name: 'dimensions',
            required: true,
            description: 'The dimension(s) to report on',
            values: 'one or more dimensions as a comma-delimited list (some combinations are not valid)',
            default: 'none'
        },
        where: {
            name: 'where',
            required: false,
            description: 'Used to specify filters for reports',
            values: '{dimension}=={value} - one or more as a semi-colon-delimited list',
            default: 'none'
        },
        limit: {
            name: 'limit',
            required: false,
            description: 'Number of items to return',
            values: 'positive integer',
            default: 10
        },
        offset: {
            name: 'offset',
            required: false,
            description: 'Number of items to skip',
            values: 'positive integer',
            default: 0
        },
        sort: {
            name: 'sort',
            required: false,
            description: 'Field to sort items on',
            values: 'a valid field for the request',
            default: 'video_view'
        },
        fields: {
            name: 'fields',
            required: false,
            description: 'Fields to return',
            values: 'varies according to the dimension you are reporting on',
            default: 'video_view'
        },
        reconciled: {
            name: 'reconciled',
            required: false,
            description: 'If included, will limit results to either historical or realtime data',
            values: 'true | false',
            default: 'none'
        },
        from: {
            name: 'from',
            required: false,
            description: 'The beginning of the date range for the request',
            values: 'An ISO 8601 date (MM-DD-YYYY), epoch time in milliseconds, the string alltime, or relative date (-1m); only dates within the past 32 days are allowed for engagement endpoints or if reconciled=false.',
            default: '30 days prior to now'
        },
        to: {
            name: 'to',
            required: false,
            description: 'The end of the date range for the request',
            values: 'An ISO 8601 date (MM-DD-YYYY), epoch time in milliseconds, the string now, or relative data (+7d); only dates within the past 32 days are allowed for engagement endpoints or if reconciled=false.',
            default: 'now'
        }
    },
    dimensions: {
        account: {
            name: 'account',
            description: 'The account dimension is used to retrieve overall analytics data for the account.',
            from: '2011-01-01',
            fields: ['account', 'account.name', 'active_media', 'ad_mode_begin', 'ad_mode_complete', 'bytes_delivered', 'daily_unique_viewers', 'drm_bytes_packaged', 'engagement_score', 'licenses_served', 'live_seconds_streamed', 'play_request', 'play_rate', 'player_load', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['The account dimension is not used as a filter.'],
            incompatible_dimensions: ['date', 'date_hour'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=account'
            }, {
                filter: 'Not applicable'
            }]
        },
        city: {
            name: 'city',
            description: 'The city dimension returns analytics data by city.',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'city', 'dma', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['A comma-delimited list of city names - e.g. Seattle,Boston,San%20Francisco'],
            incompatible_dimensions: ['date', 'date_hour'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=city'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=country&where=city==London,Boston,San%20Francisco&fields=city'
            }]
        },
        country: {
            name: 'country',
            description: 'The country dimension returns analytics data by country.',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'country', 'country_name', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['comma-delimited list of ISO-3611-1 country codes - e.g.: KO,US'],
            incompatible_dimensions: ['date', 'date_hour'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=country'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=city&where=country==US,GB,JA,KO&fields=country_name'
            }]
        },
        date: {
            name: 'date',
            description: 'The date dimension returns analytics for a single day. The user can specify the from and to parameters in yyyy-mm-dd format. This enables a user to query the analytics system to generate report report by days within the from and to date range. Any date range specified by the user will be interpreted to the current timezone for the account. The date ranges for the request are inclusive, exclusive i.e. if the user makes a request from=2013-09-24&to=2013-09-27, the response will include results from 2013-09-24 00:00:00 to 2013-09-27 00:00:00.',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'active_media', 'bytes_delivered', 'daily_unique_viewers', 'date', 'drm_bytes_packaged', 'engagement_score', 'licenses_served', 'live_seconds_streamed', 'play_request', 'play_rate', 'player_load', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['The date dimension is not used as a filter.'],
            incompatible_dimensions: ['account', 'ad_mode_begin', 'ad_mode_complete', 'city', 'country', 'destination_domain', 'destination_path', 'device_os', 'device_type', 'player', 'referrer_domain', 'region', 'search_terms', 'source_type', 'video'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=date'
            }, {
                filter: 'Not applicable'
            }]
        },
        date_hour: {
            name: 'date_hour',
            description: 'The date_hour dimension provides analytics data in hourly segments. The user can specify the from and to parameters in yyyy-MM-dd or epoch time in milliseconds format. To report over a span of hours, you will need to use the milliseconds format, with to and from values falling within the start and end hours that you want to query on. Any date range specified by the user will be interpreted to the current timezone for the account. date_hour reports are only valid for ranges within the past 32 days. If the from value is more than 32 days ago, an error will be returned.',
            from: '2011-01-01',
            fields: ['active_media', 'ad_mode_begin', 'ad_mode_complete', 'bytes_delivered', 'daily_unique_viewers', 'date_hour', 'drm_bytes_packaged', 'engagement_score', 'licenses_served', 'live_seconds_streamed', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['The date_hour dimension is not used as a filter.'],
            incompatible_dimensions: ['account', 'city', 'country', 'destination_domain', 'destination_path', 'device_os', 'device_type', 'player', 'referrer_domain', 'region', 'search_terms', 'source_type', 'video'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=date_hour&from=-6h'
            }, {
                filter: 'Not applicable'
            }]
        },
        destination_domain: {
            name: 'destination_domain',
            description: 'The destination_domain dimension provides the domain where video views occurred.',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'destination_domain', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['comma-delimited list of domains - e.g. brightcove.com'],
            incompatible_dimensions: ['ad_mode_begin', 'ad_mode_complete', 'city', 'country', 'date', 'date_hour', 'device_os', 'device_type', 'referrer_domain', 'region', 'search_terms', 'source_type'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=destination_domain'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=destination_domain,destination_path&where=destanation_domain==support.brightcove.com,docs.brightcove.com'
            }]
        },
        destination_path: {
            name: 'destination_path',
            description: 'The destination_path dimension provides the path where video views occurred. It is generally used together with the destination_domain dimension',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'destination_path', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['comma-delimited list of paths - e.g. /en/video-cloud/docs/editing-settings-players-plug-ins-tab'],
            incompatible_dimensions: ['ad_mode_begin', 'ad_mode_complete', 'city', 'country', 'date', 'date_hour', 'device_os', 'device_type', 'player', 'referrer_domain', 'region', 'search_terms', 'source_type', 'video'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=destination_path'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=destination_domain,destination_path&where=destanation_path==/training-videos'
            }]
        },
        device_os: {
            name: 'device_os',
            description: 'The device_os dimension provides information about the operating system of the device that videos were viewed on.',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'device_os', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['android', 'bada', 'ios', 'rim', 'symbian', 'web_os', 'windows', 'os_x', 'mac', 'linux', 'other'],
            incompatible_dimensions: ['city', 'date', 'date_hour', 'destination_domain', 'destination_path', 'referrer_domain', 'search_terms', 'source_type'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=device_os'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=videos&where=device_os==os_x,mac,ios'
            }]
        },
        device_type: {
            name: 'device_type',
            description: 'The device_type dimension provides information about the type of the device that videos were viewed on.',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'device_type', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['mobile', 'tablet', 'tv', 'desktop', 'other'],
            incompatible_dimensions: ['city', 'date', 'date_hour', 'destination_domain', 'destination_path', 'referrer_domain', 'search_terms', 'source_type'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=device_type'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=videos&where=device_type==mobile,tablet'
            }]
        },
        player: {
            name: 'player',
            description: 'The player dimension provides analytics for video players.',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'bytes_delivered', 'engagement_score', 'play_request', 'play_rate', 'player', 'player_load', 'player_name', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['player ids as a comma-delimited list'],
            incompatible_dimensions: ['city', 'date', 'date_hour', 'destination_path', 'region', 'search_terms'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=player'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=player&where=player==BJdk8Ms5,45dcbbdf-2807-4422-8fc7-5a1eb04d3f38,NkPHaVb2l'
            }]
        },
        referrer_domain: {
            name: 'referrer_domain',
            description: 'The referrer_domain dimension is the top private domain of the referrer URL on a page where events are collected for analytics.',
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            incompatible_dimensions: ['city', 'country', 'date', 'date_hour', 'device_os', 'device_type', 'region'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=referreferrer_domain'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=video&where=referrer_domain==brightcove.com,docs.brightcove.com'
            }]
        },
        region: {
            name: 'region',
            description: 'The region domain provides information about where videos were viewed. It returns ISO-3611-2 region codes (example: US-WA). How regions are defined varies by country.',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'region', 'region_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['comma-delimited list of the ISO-3611-2 region code - e.g. "US-WA"'],
            incompatible_dimensions: ['date', 'date_hour', 'destination_path', 'player', 'referrer_domain', 'search_terms'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=region'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=country&where=region==US-MA'
            }]
        },
        search_terms: {
            name: 'search_terms',
            description: 'The search_terms dimension is the keywords used if the traffic source that resulted in events being collected for activity metrics was a search engine, and the keywords are detectable.',
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'search_terms', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['URI-encoded, comma-delimited list of search terms - e.g. players,videos'],
            incompatible_dimensions: ['date', 'date_hour', 'destination_domain', 'destination_path', 'device_os', 'device_type', 'video'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=search_terms'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=video&where=search_terms==brightcove'
            }]
        },
        source_type: {
            name: 'source_type',
            description: 'The source_type is the type of traffic source that resulted in events being collected for analytics.',
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'source_type', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['direct', 'referral', 'organic_search', 'paid_search', 'secure_search'],
            incompatible_dimensions: ['date', 'date_hour', 'destination_domain', 'destination_path', 'device_os', 'device_type'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=source_type'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=video&where=source_type==direct'
            }]
        },
        video: {
            name: 'video',
            description: 'The video dimension provides analytics by video.',
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'bytes_delivered', 'engagement_score', 'play_request', 'play_rate', 'video', 'video_duration', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.reference_id', 'video.name'],
            filter_values: ['video ids as a comma-delimited list or video.q=={video field}:{value}'],
            incompatible_dimensions: ['city', 'date', 'date_hour', 'destination_path', 'region', 'search_terms'],
            samples: [{
                dimension: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=video'
            }, {
                filter: 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=video&where=video==4093643993001,1754276206001'
            }]
        }
    },
    combinations: {
        account__video: {
            dimensions: ['account', 'video'],
            from: '2011-01-01',
            fields: ['account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video', 'video_duration', 'video_name', 'video.reference_id']
        },
        account__player: {
            dimensions: ['account', 'player'],
            from: '2011-01-01',
            fields: ['account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'player', 'player_name']
        },
        account__player__video: {
            dimensions: ['account', 'video', 'player'],
            from: '2011-01-01',
            fields: ['account', 'ad_mode_begin', 'ad_mode_complete', 'play_request', 'play_rate', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'player', 'player_name', 'video', 'video_duration', 'video_name']
        },
        player__video: {
            dimensions: ['video', 'player'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'player', 'player_name']
        },
        account__country: {
            dimensions: ['account', 'country'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name']
        },
        account__region: {
            dimensions: ['account', 'region'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'region', 'region_name']
        },
        account__city: {
            dimensions: ['account', 'city'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma']
        },
        account__country__region: {
            dimensions: ['account', 'country', 'region'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'region', 'region_name']
        },
        country__region: {
            dimensions: ['account', 'country', 'region'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'region', 'region_name']
        },
        account__city__country: {
            dimensions: ['account', 'country', 'city'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'region', 'region_name']
        },
        account__city__region: {
            dimensions: ['account', 'region', 'city'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma', 'region', 'region_name']
        },
        city__country: {
            dimensions: ['city', 'country'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma', 'country', 'country_name']
        },
        city__region: {
            dimensions: ['region', 'city'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma', 'region', 'region_name']
        },
        account__city__country__region: {
            dimensions: ['account', 'country', 'region', 'city'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma', 'country', 'country_name', 'region', 'region_name']
        },
        account__country__video: {
            dimensions: ['account', 'video', 'country'],
            from: '2011-01-01',
            fields: ['account', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'video', 'video_duration', 'video_name']
        },
        country__video: {
            dimensions: ['video', 'country'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name']
        },
        account__country__player: {
            dimensions: ['account', 'player', 'country'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'player', 'player_name']
        },
        country__player: {
            dimensions: ['player', 'country'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name']
        },
        account__device_os: {
            dimensions: ['account', 'device_os'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os']
        },
        account__device_type: {
            dimensions: ['account', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type']
        },
        account__device_os__device_type: {
            dimensions: ['account', 'device_os', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type']
        },
        device_os__device_type: {
            dimensions: ['account', 'device_os', 'device_type'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type']
        },
        account__device_os__video: {
            dimensions: ['account', 'video', 'device_os'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'video', 'video_duration', 'video_name']
        },
        account__device_type__video: {
            dimensions: ['account', 'video', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'video', 'video_duration', 'video_name']
        },
        device_os__video: {
            dimensions: ['video', 'device_os'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.reference_id', 'video.name', 'device_os']
        },
        device_type__video: {
            dimensions: ['video', 'device_type'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.reference_id', 'video.name', 'device_type']
        },
        account__device_os__device_type__video: {
            dimensions: ['account', 'video', 'device_os', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type', 'video', 'video_duration', 'video_name']
        },
        account__device_os__player: {
            dimensions: ['account', 'player', 'device_os'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'player', 'player_name']
        },
        device_os__player: {
            dimensions: ['player', 'device_os'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os']
        },
        account__device_type__player: {
            dimensions: ['account', 'player', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'player', 'player_name']
        },
        device_type__player: {
            dimensions: ['player', 'device_type'],
            from: '2011-01-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type']
        },
        account__device_os__device_type__player: {
            dimensions: ['account', 'player', 'device_os', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type', 'player', 'player_name']
        },
        account__referrer_domain: {
            dimensions: ['account', 'referrer_domain'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain']
        },
        referrer_domain__source_type: {
            dimensions: ['referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        account__referrer_domain__source_type: {
            dimensions: ['account', 'referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        referrer_domain__search_terms: {
            dimensions: ['referrer_domain', 'search_terms'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms']
        },
        account__referrer_domain__search_terms: {
            dimensions: ['account', 'referrer_domain', 'search_terms'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms']
        },
        referrer_domain__search_terms__source_type: {
            dimensions: ['referrer_domain', 'source_type', 'search_terms'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms', 'source_type']
        },
        search_terms__source_type: {
            dimensions: ['source_type', 'search_terms'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'search_terms', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        account__source_type: {
            dimensions: ['account', 'source_type'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        account__search_terms: {
            dimensions: ['account', 'search_terms'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms']
        },
        account__search_terms__source_type: {
            dimensions: ['account', 'source_type', 'search_terms'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms', 'source_type']
        },
        account__referrer_domain__search_terms__source_type: {
            dimensions: ['account', 'referrer_domain', 'source_type', 'search_terms'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain', 'search_terms', 'source_type']
        },
        referrer_domain__video: {
            dimensions: ['video', 'referrer_domain'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.name', 'referrer_domain']
        },
        source_type__video: {
            dimensions: ['video', 'source_type'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video', 'video_duration', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.name', 'source_type']
        },
        referrer_domain__source_type__video: {
            dimensions: ['video', 'referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type', 'video', 'video_duration', 'video_name']
        },
        account__referrer_domain__source_type__video: {
            dimensions: ['account', 'video', 'referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain', 'source_type', 'video', 'video_duration', 'video_name']
        },
        player__referrer_domain: {
            dimensions: ['player', 'referrer_domain'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain']
        },
        player__source_type: {
            dimensions: ['player', 'source_type'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        player__referrer_domain__source_type: {
            dimensions: ['player', 'referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain', 'source_type']
        },
        account__player__referrer_domain__source_type: {
            dimensions: ['account', 'player', 'referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'player', 'player_name', 'referrer_domain', 'source_type']
        },
        account__country__device_os: {
            dimensions: ['account', 'device_os', 'country'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_os']
        },
        account__device_os__region: {
            dimensions: ['account', 'device_os', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'region', 'region_name']
        },
        account__country__device_os__region: {
            dimensions: ['account', 'device_os', 'country', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_os', 'region', 'region_name']
        },
        account__country__device_type: {
            dimensions: ['account', 'device_type', 'country'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_type']
        },
        account__device_type__region: {
            dimensions: ['account', 'device_type', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'region', 'region_name']
        },
        account__country__device_type__region: {
            dimensions: ['account', 'device_type', 'country', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_type', 'region', 'region_name']
        },
        account__country__device_os__device_type: {
            dimensions: ['account', 'device_os', 'device_type', 'country'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_os', 'device_type']
        },
        account__device_os__device_type__region: {
            dimensions: ['account', 'device_os', 'device_type', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type', 'region', 'region_name']
        },
        account__country__device_os__device_type__region: {
            dimensions: ['account', 'device_os', 'device_type', 'country', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_os', 'device_type', 'region', 'region_name']
        },
        country__device_os: {
            dimensions: ['device_os', 'country'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os']
        },
        device_os__region: {
            dimensions: ['device_os', 'region'],
            from: '2015-10-19',
            fields: ['account.name', 'device_os', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'region', 'region_name']
        },
        country__device_os__region: {
            dimensions: ['device_os', 'country', 'region'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'region', 'region_name']
        },
        country__device_type: {
            dimensions: ['device_type', 'country'],
            from: '2015-10-19',
            fields: ['account.name', 'country', 'country_name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type']
        },
        device_type__region: {
            dimensions: ['device_type', 'region'],
            from: '2015-10-19',
            fields: ['device_type', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'region', 'region_name']
        },
        country__device_type__region: {
            dimensions: ['device_type', 'country', 'region'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'region', 'region_name']
        },
        country__device_os__device_type: {
            dimensions: ['device_os', 'device_type', 'country'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type']
        },
        device_os__device_type__region: {
            dimensions: ['device_os', 'device_type', 'region'],
            from: '2015-10-19',
            fields: ['device_os', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'region', 'region_name']
        },
        country__device_os__device_type__region: {
            dimensions: ['device_os', 'device_type', 'country', 'region'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type', 'region', 'region_name']
        },
        account__destination_path: {
            dimensions: ['account', 'destination_path'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_path']
        },
        account__destination_domain: {
            dimensions: ['account', 'destination_domain'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain']
        },
        account__destination_domain__destination_path: {
            dimensions: ['account', 'destination_domain', 'destination_path'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain', 'destination_path']
        },
        destination_domain__destination_path: {
            dimensions: ['account', 'destination_domain', 'destination_path'],
            from: '2014-03-03',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain', 'destination_path']
        },
        destination_domain__player: {
            dimensions: ['player', 'destination_domain'],
            from: '2014-03-03',
            fields: ['bytes_delivered', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain']
        },
        account__destination_domain__player: {
            dimensions: ['account', 'player', 'destination_domain'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain', 'player', 'player_name']
        },
        destination_domain__video: {
            dimensions: ['video', 'destination_domain'],
            from: '2014-03-03',
            fields: ['ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain', ]
        },
        account__destination_domain__video: {
            dimensions: ['account', 'video', 'destination_domain'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'ad_mode_begin', 'ad_mode_complete', 'engagement_score', 'play_request', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain', 'video', 'video_duration', 'video_name']
        }
    }
};
