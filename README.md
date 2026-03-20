# n8n-nodes-naver-news-scraper

This is an [n8n](https://n8n.io/) community node that lets you scrape news articles from **Naver News (네이버 뉴스)** — Korea's most-visited news aggregator — directly in your n8n workflows.

Powered by [Apify](https://apify.com/oxygenated_quagmire/naver-news-scraper), this node extracts Korean news data including full article text, press metadata, and trending topics from 1,000+ Korean news outlets.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

- 🔍 **Search by keyword** — Find articles about any topic (e.g., "삼성전자", "BTS", "AI")
- 📰 **Browse by section** — Politics, Economy, Society, Culture, World, Science/IT
- 🏆 **Popular/Ranking news** — Get currently trending articles
- 📄 **Article detail** — Fetch full text from specific article URLs
- ⏰ **Time filters** — Last hour, day, week, month, or custom date ranges
- 🔀 **Sort options** — By relevance, newest, or oldest
- 🤖 **AI-ready** — Use as a tool in n8n AI Agent workflows

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-naver-news-scraper`
4. Agree to the risks and select **Install**

### Manual Installation

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-naver-news-scraper
```

## Authentication

You need an [Apify API token](https://console.apify.com/account/integrations) to use this node.

1. Create a free [Apify account](https://apify.com)
2. Go to **Settings > Integrations** to get your API token
3. In n8n, create new credentials of type **Apify API** and paste your token

## Usage Examples

### Monitor Korean Tech News → Slack

Search for Samsung/LG/SK news every hour and send summaries to Slack:

1. **Schedule Trigger** → runs every hour
2. **Naver News Scraper** → keyword: "삼성전자 OR LG OR SK하이닉스", period: "1h"
3. **Slack** → post article titles and URLs

### Korean News Sentiment Analysis

Collect news articles with full text for AI analysis:

1. **Naver News Scraper** → keyword: "한국 경제", fetchDetails: true
2. **AI Agent** → analyze sentiment of article bodies
3. **Google Sheets** → log results

### Daily News Digest

Get top news from each section for a daily briefing:

1. **Schedule Trigger** → runs daily at 9 AM
2. **Naver News Scraper** → mode: "ranking", maxResults: 10
3. **Email** → send formatted digest

## Modes

| Mode | Description | Required Input |
|------|-------------|----------------|
| Search by Keyword | Search articles matching a keyword | `keyword` |
| Browse by Section | List articles from a news section | `section` |
| Popular/Ranking | Get trending/popular articles | - |
| Article Detail | Fetch full details of specific articles | `articleUrls` |

## Output

Each article includes:

- `title` — Article headline
- `link` — Direct URL to the article
- `press` — Publisher name
- `pressLogo` — Publisher logo URL
- `date` — Publication date
- `summary` — Article snippet
- `body` — Full article text (when `fetchDetails` is enabled)
- `category` — News category
- `reactions` — Reader reactions data

## Part of Korean Data Collection

This node is part of the **Korean Data** suite of Apify Actors for n8n:

| Node | npm Package | Description |
|------|-------------|-------------|
| **Naver News Scraper** | `n8n-nodes-naver-news-scraper` | Korean news articles |
| Naver Place Search | *coming soon* | Korean local business search |
| Melon Chart Scraper | *coming soon* | K-pop music charts |
| Naver Place Reviews | *coming soon* | Korean business reviews |
| More... | *coming soon* | 13 Korean data scrapers total |

## Resources

- [Apify Actor page](https://apify.com/oxygenated_quagmire/naver-news-scraper)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
