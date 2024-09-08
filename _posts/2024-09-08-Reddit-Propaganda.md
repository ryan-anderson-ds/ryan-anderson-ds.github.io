---
layout: post
title: Exploring Reddit Propaganda in Canada
type: insights
---

Reddit, the social media platform, has over 500 million accounts - the majority being in the 18-29 year old demographic. It's the 7th most popular website in Canada. It's a big deal, particularly in the USA and Canada - a one stop shop filled with news, memes, public opinions and even the power to [influence the stock market](https://www.vox.com/the-goods/22249458/gamestop-stock-wallstreetbets-reddit-citron). But something dark is up in its Canadian corner. 

Loading the home page from Canada, you're presented with the homepage [/r/canada](https://www.reddit.com/r/canada/). After reading a few posts there, it's clear something's up. It's filled with angry, angry Canadians. Doom-and-gloom news articles. You would think Canada is the worst place in the world to live, and that our politicians can't get a single thing right.

This is a big deal, because reddit can provide a strong pulse of the public opinion of a town, country, or event. Read a post and you know how everyone's feeling on it - and as social beings, this changes our opinion (or gives us one).

Importantly, the way reddit works allows for default content from particular subreddits (mini content feeds) to display to all people logging in from a particular area. The default Canadian subreddit, /r/canada, is an example of this. Anyone viewing reddit from Canada receives this content by default, unless they log in and opt out from the subreddit.

This default content looks a bit... political. Right now, the top posts from the last month include:
- "Government officers told to skip fraud prevention steps when vetting temporary foreign worker applications, Star investigation finds"
- "We’re getting lousy value for the taxes we pay in Canada"
- Our car was stolen out of our driveway in Burlington. We knew where it was. Nothing was done. This is how institutions crumble

Importantly, ALL of the top 20 posts from the last month are political. And this isn't a surprise. We're already suspicious. [CBC had a look and found shenanigans](https://www.cbc.ca/listen/live-radio/1-14-day-6/clip/16079694-behind-anger-reddit-canada-site). Later, CBC published [another article](https://www.cbc.ca/news/investigates/russian-influence-election-tenet-media-chen-southern-1.7314976) finding influencers collaborating with Russian propaganda scheme.

So I decided to have a look for myself.

I scraped 30 days of posts and comments from /r/canada, and used the OpenAI GPT4o API to classify each of the posts and their comments as liberal, conservative or neutral/non-political. Rather than classify each of the comments individually, I classified posts as a whole, but considered their comments towards the net result, at a lower weight than the post title. For instance, a conservative post with 80% liberal or neutral comments would probably be labeled neutral or liberal. This would take into account the comments, the upvotes, and get an altogether strong pulse for each post.

The results are quite telling.

![reddit propaganda](images/redditpropaganda.png "/r/canada propaganda")

Firstly, given that we allow posts to be classified as "neutral," it's surprising how political the subreddit is. On a website famously for nerds and cat pictures, one would expect more pictures, videos, memes or questions. As [CBC put it](https://www.cbc.ca/listen/live-radio/1-14-day-6/clip/16079694-behind-anger-reddit-canada-site), it's strange how the majority of posts are news links, and not user generated content. In fact, /r/canada is the only country subreddit without any user generated content in the top 10. 

Secondly, and most telling, the majority of conservative posts are made by 5 users. As you can see from the visualisation, the subreddit swings right. Very hard. Given the 18-29 year old demographic on reddit, this is extremely telling that something is afoot.

Looking at the individual users, Caliperlee62 and FancyNewMe are clearly the main political troll accounts for this 30 day period. Every single post they do is in /r/canada, and they are all conservative. We can't discern where they live, but these accounts are _entirely_ concerned with posting right-leaning news articles about Canada. Given that these users have no other subreddit action, they are obviously being managed with political intent.

Unusual-State1827 and Hopoke are also primarily political accounts, but interestingly both often post liberal articles. This is where things get even more interesting - the _comments_ on their posts are very conservative. So we'd have liberal posts being bombarded with upvoted conservative comments. 

This prompted me to look at the ratio of upvotes to downvotes based on post type
- Liberal posts (20% of all posts) have received 78,906 upvotes
- Neutral posts (40% of all posts) have received 78,565 upvotes
- **Conservative (40% of all posts) have received 225,183 upvotes** - right wing posts are getting heavily upvoted, and most likely by bots.

So, to summarise, we're seeing
- ~60% of the content on /r/canada is to news articles, more than any other country
- The majorty of this is doom-and-gloom / conservative content
- Even when content is left leaning, conservative comments spam the articles
- Conservative content is getting heavily upvoted

Given the [recent evidence](https://www.cbc.ca/news/investigates/russian-influence-election-tenet-media-chen-southern-1.7314976) of Russian propaganda activity in Canada, we can probably assume the worst here. And we should care about it - because this is _the default subreddit_ for Canada. Anyone coming to Canada and viewing reddit sees this content by default. From an outsider perspective, it looks like a very angry, very troubled place (so vote for your local Trump-equivalent!).
