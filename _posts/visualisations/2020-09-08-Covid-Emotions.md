---
layout: post
title: Emotions soaring during Covid-19 - Emotion detection over 100 million tweets since January
type: visualisations
---

I ran 100 million covid-related tweets through my own [emotion-detecting neural network](../Multi-Label-Emotion-Classification/). I won't try to explain the reasons behind the results, since this is an area rife with correlation, US-bias and a very complex system. However, some very interesting patterns emerge!

Before you see the visualisation, some quick notes:
* Each emotion has a "cutoff" point - you're only seeing the top half of each emotion graph to show the excess emotions on display on Twitter. These emotions are still occuring throughout the year, just less than the yearly average.
* Twitter is very USA-centric. There are far more USA users than those from any other countries. As well as a higher death rate than most. That's why I have added the US covid death rate figures.

![world](../images/visu/covid-emotions.png "covid-emotions")

The first thing that one can see is the clear phases of emotions that Twitter goes through. A brief bout of confusion and amusement is soon replaced with caring, fear and gratitude as the USA issues stay-at-home orders. As things start descending into chaos, we begin to see some heavy negative emotions: anger, annoyance, embarrassment, disappointment and even worse: rising disgust, many probably as a result of those shaming people for refusing to take the crisis seriously.

Polarised emotions are a thing! Perhaps especially in a two-party democracy such as the USA. Look at "approval" vs "disapproval" - they are often correlating, except in early May. What happened then? Similarly, fear and gratitude seem to correlate.

The strongest of all emotions in relative terms are the spikes in confusion and gratitude. The early spike in confusion makes absolute sense, but one can only make theories about gratitude. For instance, maybe summer holidays have arrived and people _really_ don't take this summer for granted after staying at home in spring!

Technical stuff
------
* Some emotions never really spiked - such as "desire" and "love." I've excluded them from the visualisation.
* I didn't run the full hundred million tweets through the model - I sampled 2000 random tweets from each day and picked the English ones.
* My neural network was trained on a reddit dataset. Emotion detection results will differ slightly due to differing demographics and typical use of each platform.
* These tweets are preselected as covid-related tweets. Therefore these are not the world's emotions as a whole, but only those expressed when combined with a covid-centric hashtag


Code and tools
------
**Code**: 

[GitHub](https://github.com/rian-van-den-ander/explorations/tree/master/covid-sentiment)

Note: This code is not intended to run out-of-the-box: You need to fetch the tweets yourself using something like Hydrator. If your python version differs to mine, the neural network pickle may not load.

**Data**: 

[Covid death rates](https://ourworldindata.org/coronavirus-data?country=~OWID_WRL)

[Covid tweets](https://github.com/delvinso/covid19_one_hundred_million_unique_tweets)

**Tools:** Python, GIMP


