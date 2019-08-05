---
layout: post
title: Exploring my Tinder data - what correlates with matches?
type: insights
---

In an earlier post, [I looked at the raw stats](https://rian-van-den-ander.github.io/9-Months-Tinder-Amsterdam/) of my Tinder for the first 9 months in Amsterdam. In this post, I'll show my attempt at finding any patterns or useful real-world conclusions from my data. I do find one unexpected correlation, as well as an interesting personal insight. 

**Constants, assumptions:**
* I spent these 9 months almost entirely in Amsterdam. On weekends away and my one week holiday, I barely used Tinder.
* My profile pictures and bio remained the same
* I did use paid boosts, a Tinder mechanism which shows your profile to +- 8 times more people than usual for 15 minutes. It is very hard to get matches without boosting. However, my strategy remained constant. I would boost on a Sunday evening around 8pm.
* I never ran out of profiles in Amsterdam. Whilst I did swipe a lot, there is such a large dating pool here that I never hit the dreaded screen telling me there were no new profiles.
 
**The data:**

You can request your data [from Tinder](https://account.gotinder.com/data). After some time (two weeks in my case), they email you a package with your images as well as a json file with _most_ of your activity. I use the word _most_ because the package is mysteriously missing boost usage, and many other potential inputs that could be explanatory features. For instance, whether a match came from a boost, or anything about the other person, such as distance from you or the messages they sent. So what you're provided with is:

* Your profile data
* Your purchases
* The messages you sent to others
* Swipes left per day (Swipe left = phone gesture to dislike a profile)
* Swipes right per day (Swipe right = like a profile, and potentially match) 
* App opens per day
* Matches per day

**The analysis:**

Naturally, the first thing I wanted to see was my usage pattern. For this, I could have used the app_opens json fields, but found that they were far more correlated with messages sent than with swiping. So I looked at total swipes per day. 

![Swipes per day](../images/insights/tinder_2019_07_28/swipes_per_day.png "Swipes per day")

Here, I could see periods of my life in Amsterdam accurately reflected in the data.
1. Arriving in Amsterdam and excitedly dating
2. I went on many dates, and casually dated one lovely person for over a month
3. We stopped seeing each other, and 2019 began in full swing, with a big uptake in looking for a partner
4. I met someone else, and we casually dated for a couple of months. 
5. We stopped seeing each other, and my Tinder activity increased
6. I made the conscious decision to focus on work and friends, and to make Amsterdam my home before seriously dating. 


The obvious next question was how my swiping activity correlated with my matches. The correlation was a surprisingly high 78%. For this analysis, I smoothed out the data somewhat. Rather than look at each day by itself, and see lots of spikes on days I was active, I wanted to see a rolling window average over the past two weeks. This method remained constant through the rest of the analysis, as it proved much more useful to pick up trends. Furthermore, it must be noted that the method here is far from perfect - a match can obviously happen many days after a swipe, although that is a rare case for me. The rolling window mean helps to negate this effect, though. 

![Matches versus swipes](../images/insights/tinder_2019_07_28/matches_versus_swipes.png "Matches versus swipes")

I expected this correlation to be lower, given some well-known Tinder behaviour: Tinder puts the profiles of those that like you near to the top of your stack of profiles. For instance, if you started the day with nobody in your area, then 10 profiles popped up in your area, and 2 of them liked you, the 2 would be far more likely to be at the top of your stack. This works both ways, however. If I had liked another profile I would have more chance appearing near the top of their stack. It appears that either the latter effect was stronger than I expected, or Tinder was rewarding my activity through another mechanism in their algorithm.

**Insight 1: swipe more to get more matches!** Somewhat obvious, but a lot more effective than I expected.

Next, I thought I would control for swipes, getting the amount of matches per 50 swipes.

![Matches per 50 swipes](../images/insights/tinder_2019_07_28/matches_per_swipes.png "Matches per 50 swipes")

Interesting! Even though increasing my swipes per day were the primary reason I was getting matches, there was something else at play. My ratio got as good as 7 in 50, but also below 1 per 50.

You would think this was most likely due to boosts. However, I checked my boost _purchase_ data (usage data unavailable), and this was largely constant across the 9 months. In fact, the time when I had the most matches per swipe, I was boosting slightly less than other months. 

I still have no good reason for this, but maybe Occam's razor applies: By the trends in usage it seemed that from January to March, my Tinder usage was low. Perhaps I had 'built up' some incoming likes, and new people had entered the dating pool in Amsterdam, which made for quick matches when my Tinder usage increased. 

**Pickiness**

The original reason to request my Tinder data was to explore my pickiness over the 9 months. 

I had been chatting to a friend about how great Amsterdam was for dating versus Cape Town. I wanted to see if my move from Cape Town to Amsterdam had resulted in my pickiness increasing. Was I becoming spoilt?

This was easy to measure - I would just look at the ratio between my left and right swipes. 

![Pickiness - left vs right swipes ](../images/insights/tinder_2019_07_28/left_vs_right.png "Pickiness - left vs right swipes ")

Now _this_ was interesting!
* Firstly, at the moment, my ratio was exactly the same as when I started. I hadn't gotten any pickier overall
* Secondly, the difference between a "picky" Ryan and a "desparate Ryan" was a factor of 4!

Note: Here, again, the methodology is not perfect. Tinder is known to put more attractive people (determined on the ratio of likes they get) on the top of your stack. If you move to a new city, or install Tinder, you are more likely to be presented with good looking human beings. As you get to the bottom of the stack, not everyone is a perfect 10. So my pickiness number here could easily have been influenced by how full the stack of Amsterdammers was at the moment. For instance, had I not used Tinder for a few months, I probably would have swiped right on more profiles for two reasons:
* Clearly I was back on Tinder on a mission 
* Tinder had built up a new 'buffer' of attractive people at the top of my list.

That aside, there were some clear periods of pickiness that I could link to conscious decisions in my past where I was either
* Casually dating someone, and would only consider swiping on somebody who really caught my eye
* In February and March, deciding that I was not that enthusiastic about dating, as I needed to focus on work and friends. Therefore it would take someone special to get a right swipe. 

**Does pickiness influence match ratio?**

Finally, this begged the question: How did my pickiness affect my matches? Here, I graphed and correlated my pickiness versus the likelihood I would get a match from a swipe. 

![Pickiness versus success](../images/insights/tinder_2019_07_28/pickiness_correlation.png "Pickiness versus success")

The correlation was 21%, and _positive_. This, too, was interesting. I expected much lower correlation than this. Furthermore, I expected a _negative_ correlation if anything. Here, 40 000 data points showed that the pickier I was, the more likely I was to get a match! 

It is possible that Tinder algorithmically favours the picky. For instance, maybe the algorithm assumes that more picky people are more attractive, therefore puts them further up other people's stacks. It is also highly possible that in my more picky state, I look carefully at others' profiles, and I am more likely to pick someone who has things in common with me. This, I can't know for sure. But:

**Insight 2: Swipe right less, get more matches per swipe!** Still less matches overall, but more matches per swipe. 

This ended my exploration. I would have liked to know more. I would have loved to have more data on when exactly I used boosts, as well as data linking the time of my swipe to a match. But most of all I would have loved to know how many profiles there were in my area over time - as I feel this was a potentially large explanatory feature in my analysis. In a hypothetical city of only 10 people with one person I was attracted to, this would be the only feature worth analysing. In the perfect dating city, with infinite attractive people, I feel that my success would be mostly defined by swiping, boosting and pickiness. Amsterdam lies somewhere between these two. 

Finally, I would love to see this data for other people, to see if I could find seasonal patterns in Amsterdam (maybe people date more in Winter?) or clear points of Tinder algorithm change. The Tinder databases must be an absolute gold-mine of insights like this.

**Code**: [GitHub](https://github.com/rian-van-den-ander/explorations/tree/master/tinder_data)

**Tools**: Python and standard libraries

 


