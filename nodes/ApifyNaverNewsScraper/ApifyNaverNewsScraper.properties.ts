import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

// Helper functions for parameter extraction
// @ts-ignore unused but kept for potential future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _getFixedCollectionParam(
	context: IExecuteFunctions,
	paramName: string,
	itemIndex: number,
	optionName: string,
	transformType: 'passthrough' | 'mapValues',
): Record<string, any> {
	const param = context.getNodeParameter(paramName, itemIndex, {}) as { [key: string]: any[] };
	if (!param?.[optionName]?.length) return {};

	let result = param[optionName];
	if (transformType === 'mapValues') {
		result = result.map((item: any) => item.value);
	}
	return { [paramName]: result };
}

function getJsonParam(context: IExecuteFunctions, paramName: string, itemIndex: number): Record<string, any> {
	try {
		const rawValue = context.getNodeParameter(paramName, itemIndex);
		if (typeof rawValue === 'string' && rawValue.trim() === '') {
			return {};
		}
		return { [paramName]: typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue };
	} catch (error) {
		throw new Error(`Invalid JSON in parameter "${paramName}": ${(error as Error).message}`);
	}
}

function getOptionalParam(context: IExecuteFunctions, paramName: string, itemIndex: number): Record<string, any> {
	const value = context.getNodeParameter(paramName, itemIndex);
	return value !== undefined && value !== null && value !== '' ? { [paramName]: value } : {};
}

export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		// Mode (mode)
		mode: context.getNodeParameter('mode', itemIndex),
		// Search Keyword (keyword)
		...getOptionalParam(context, 'keyword', itemIndex),
		// Sort Order (sort)
		sort: context.getNodeParameter('sort', itemIndex),
		// Time Period (period)
		period: context.getNodeParameter('period', itemIndex),
		// Date From (dateFrom)
		...getOptionalParam(context, 'dateFrom', itemIndex),
		// Date To (dateTo)
		...getOptionalParam(context, 'dateTo', itemIndex),
		// News Section (section)
		section: context.getNodeParameter('section', itemIndex),
		// Article URLs (articleUrls)
		...getJsonParam(context, 'articleUrls', itemIndex),
		// Fetch Full Article Details (fetchDetails)
		fetchDetails: context.getNodeParameter('fetchDetails', itemIndex),
		// Max Results (maxResults)
		maxResults: context.getNodeParameter('maxResults', itemIndex),
		// Proxy Configuration (proxyConfiguration)
		...getJsonParam(context, 'proxyConfiguration', itemIndex),
	};
}

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const actorProperties: INodeProperties[] = [
  {
    "displayName": "Mode",
    "name": "mode",
    "description": "What to scrape: search by keyword, browse by section, get popular ranking, or fetch specific article details",
    "required": false,
    "default": "search",
    "type": "options",
    "options": [
      {
        "name": "Search by Keyword",
        "value": "search"
      },
      {
        "name": "Browse by Section",
        "value": "section"
      },
      {
        "name": "Popular/Ranking News",
        "value": "ranking"
      },
      {
        "name": "Article Detail (by URL)",
        "value": "article"
      }
    ]
  },
  {
    "displayName": "Search Keyword",
    "name": "keyword",
    "description": "Search keyword (required for 'search' mode). Examples: '삼성전자', 'BTS', 'AI', '한국 경제', 'Samsung Galaxy'",
    "required": false,
    "default": "",
    "type": "string"
  },
  {
    "displayName": "Sort Order",
    "name": "sort",
    "description": "How to sort search results",
    "required": false,
    "default": "relevance",
    "type": "options",
    "options": [
      {
        "name": "Relevance (관련도순)",
        "value": "relevance"
      },
      {
        "name": "Newest First (최신순)",
        "value": "newest"
      },
      {
        "name": "Oldest First (오래된순)",
        "value": "oldest"
      }
    ]
  },
  {
    "displayName": "Time Period",
    "name": "period",
    "description": "Filter results by time period (search mode only)",
    "required": false,
    "default": "all",
    "type": "options",
    "options": [
      {
        "name": "All Time",
        "value": "all"
      },
      {
        "name": "Last 1 Hour",
        "value": "1h"
      },
      {
        "name": "Last 1 Day",
        "value": "1d"
      },
      {
        "name": "Last 1 Week",
        "value": "1w"
      },
      {
        "name": "Last 1 Month",
        "value": "1m"
      },
      {
        "name": "Last 3 Months",
        "value": "3m"
      },
      {
        "name": "Last 6 Months",
        "value": "6m"
      },
      {
        "name": "Last 1 Year",
        "value": "1y"
      }
    ]
  },
  {
    "displayName": "Date From",
    "name": "dateFrom",
    "description": "Custom date range start (YYYY-MM-DD). Only used when period is 'all' and both dateFrom/dateTo are set.",
    "required": false,
    "default": "",
    "type": "string"
  },
  {
    "displayName": "Date To",
    "name": "dateTo",
    "description": "Custom date range end (YYYY-MM-DD)",
    "required": false,
    "default": "",
    "type": "string"
  },
  {
    "displayName": "News Section",
    "name": "section",
    "description": "Which news section to browse (only for 'section' mode)",
    "required": false,
    "default": "politics",
    "type": "options",
    "options": [
      {
        "name": "Politics (정치)",
        "value": "politics"
      },
      {
        "name": "Economy (경제)",
        "value": "economy"
      },
      {
        "name": "Society (사회)",
        "value": "society"
      },
      {
        "name": "Culture (생활/문화)",
        "value": "culture"
      },
      {
        "name": "World (세계)",
        "value": "world"
      },
      {
        "name": "Science/IT (IT/과학)",
        "value": "science"
      }
    ]
  },
  {
    "displayName": "Article URLs",
    "name": "articleUrls",
    "description": "List of Naver News article URLs to scrape (required for 'article' mode). Example: [\"https://n.news.naver.com/article/015/0005256324\"]",
    "required": false,
    "default": "",
    "type": "json"
  },
  {
    "displayName": "Fetch Full Article Details",
    "name": "fetchDetails",
    "description": "For search/section/ranking modes: also fetch each article's full page for body text, author, reactions, and more. Slower but provides much richer data.",
    "required": false,
    "default": false,
    "type": "boolean"
  },
  {
    "displayName": "Max Results",
    "name": "maxResults",
    "description": "Maximum number of articles to return (1–500)",
    "required": false,
    "default": 20,
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 500
    }
  },
  {
    "displayName": "Proxy Configuration",
    "name": "proxyConfiguration",
    "description": "Apify Proxy settings (optional — Naver News usually doesn't require proxies)",
    "required": false,
    "default": "",
    "type": "json"
  }
];

export const properties: INodeProperties[] = [...actorProperties, ...authenticationProperties];