---
layout: post
title: What makes a successful film? Predicting a film's revenue and user rating with machine learning
type: insights
---


The Movie DB ([TMDB](https://www.themoviedb.org/)) provides an API for film data, the data which can be downloaded from [here](https://www.kaggle.com/tmdb/tmdb-movie-metadata). I strove to find out whether, **knowing only things I would know before a film was released**, what the rating and revenue of the film would be. What parameters best predict a good or top grossing film? Which cast or actors predict them?


Summary
------
I trained a model on a randomized 90% of the movies, and then tested it on the remaining 10%. For these test movies:

* **It was a simple challenge to get a very good prediction of film revenue**. R^2 = 0.77. In laymans terms, knowing only facts about the film before release, the model can make a certifiably good prediction - enough for a cinema to decide ahead of time whether to show a film for an extended period of time, for instance.
* **It was much more difficult to predict film rating**, but I could do a fair bit better than if I had just predicted an average rating for each movie, getting an R^2 of 0.53.
* **Film crew** turned out to be the difference in a bad and a good film rating prediction, as well as the biggest difference between a well and poorly rated movie. Much more so than actors are.
* I had some fun, too. Scroll down for a **list of actors most associated with high rated and top grossing films**.

![Revenue predictions](../images/insights/predicting_film_success_2019_08_05/revenue_predictions.png "Revenue predictions")



The data
------
![The data](../images/insights/predicting_film_success_2019_08_05/data.png "the data")

The data is well labeled, but I will not bore with too many details. To summarise:
* TMDB is community built, with data often provided by the public, so not everything is present or very accurate. For instance, over 900 revenue values were missing. 
* I ignored some non-useful variables, such as film title and homepage. Obviously these can't be used to predict the success of a movie.
* Some variables were discarded for other reasons: production_country, because I felt that the information therein would be stored in production_company. Original_language, because I felt that that column would mostly be covered by spoken_languages, with a few exceptions. Popularity, because obviously that was measured after the film was released.
* The variables used for **input** were:
	- budget
	- a list of film genres
	- release date - split up into year and day of the year
	- a list of spoken languages
	- runtime 
	- a list of production companies 
	- a list of cast members 
	- a list of crew members
	- keywords - a list of user assigned keywords. Admittedly some of these would only be known after the movie was released, but these did not give away too much. A typical keyword would be 'based on a novel.'
* The variables used for **model prediction** were:
	- User vote (akin to IMDb rating, referred to as 'rating' throughout)
	- User-reported box office revenue (referred to as 'revenue' throughout)
		
		
Data preparation
------
Source file: [data_prep.py](https://github.com/rian-van-den-ander/explorations/tree/master/film_success/data_prep.py)

**Problem**: revenue data is not good enough
* I removed zero revenue rows, resulting in 900 rows lost. Not great, but I can't predict revenue without revenue. 
* I adjusted revenue for inflation. Initially, I thought this wouldn't make such a difference, but it actually improved R^2 by 0.02.

**Problem**: How should I represent release date?
* I decided to separate the variable into year and day of the year. Year, because revenue would definitely correlate with world population and societal patterns. Day of the year, as we know film revenue can correlate with a Christmas or summer release. This paid off, as day of the year turned out to be top-30 variable predicting revenue.

**A much bigger problem**: Many columns are JSON lists of 'columns'
* Some columns had lists stored inside: Each of genre, keywords, production company, spoken languages, cast and crew was actually a list of genre, keywords etc. These can't be processed by any machine learning libraries I know of.
* I had to create [a new library](https://github.com/rian-van-den-ander/encode_json_data_within_dataframe) to transform these lists into columns for my model, a process known as [encoding categorical features](https://towardsdatascience.com/encoding-categorical-features-21a2651a065c)
* This created a new issue: There are far too many cast, crew and keywords for my poor computer to handle. I had to limit this per input column. This is not great for my model, as I would now just take the most common 500 actors as opposed to all actors, the top 500 cast, the top 100 keywords, and the top 100 film studios. This could be improved by hosting the solution on the cloud and throwing more power at the model training, or by being more patient.

Rows of JSON sets of actors, such as one row here... 
~~~ 
[{"cast_id": 242, "character": "Jake Sully", "credit_id": "5602a8a7c3a3685532001c9a", "gender": 2, "id": 65731, "name": "Sam Worthington", "order": 0}, {"cast_id": 3, "character": "Neytiri", "credit_id": "52fe48009251416c750ac9cb", "gender": 1, "id": 8691, "name": "Zoe Saldana", "order": 1}, {"cast_id": 25, "character": "Dr. Grace Augustine", "credit_id": "52fe48009251416c750aca39", "gender": 1, "id": 10205, "name": "Sigourney Weaver", "order": 2}, {"cast_id": 4, "character": "Col. Quaritch", "credit_id": "52fe48009251416c750ac9cf", "gender": 2, "id": 32747, "name": "Stephen Lang", "order": 3}, {"cast_id": 5, "character": "Trudy Chacon", "credit_id": "52fe48009251416c750ac9d3", "gender": 1, "id": 17647, "name": "Michelle Rodriguez", "order": 4}, {"cast_id": 8, "character": "Selfridge", "credit_id": "52fe48009251416c750ac9e1", "gender": 2, "id": 1771, "name": "Giovanni Ribisi", "order": 5}, {"cast_id": 7, "character": "Norm Spellman", "credit_id": "52fe48009251416c750ac9dd", "gender": 2, "id": 59231, "name": "Joel David Moore", "order": 6}, {"cast_id": 9, "character": "Moat", "credit_id": "52fe48009251416c750ac9e5", "gender": 1, "id": 30485, "name": "CCH Pounder", "order": 7}, {"cast_id": 11, "character": "Eytukan", "credit_id": "52fe48009251416c750ac9ed", "gender": 2, "id": 15853, "name": "Wes Studi", "order": 8}, {"cast_id": 10, "character": "Tsu'Tey", "credit_id": "52fe48009251416c750ac9e9", "gender": 2, "id": 10964, "name": "Laz Alonso", "order": 9}, {"cast_id": 12, "character": "Dr. Max Patel", "credit_id": "52fe48009251416c750ac9f1", "gender": 2, "id": 95697, "name": "Dileep Rao", "order": 10}, {"cast_id": 13, "character": "Lyle Wainfleet", "credit_id": "52fe48009251416c750ac9f5", "gender": 2, "id": 98215, "name": "Matt Gerald", "order": 11}, {"cast_id": 32, "character": "Private Fike", "credit_id": "52fe48009251416c750aca5b", "gender": 2, "id": 154153, "name": "Sean Anthony Moran", "order": 12}, {"cast_id": 33, "character": "Cryo Vault Med Tech", "credit_id": "52fe48009251416c750aca5f", "gender": 2, "id": 397312, "name": "Jason Whyte", "order": 13}, {"cast_id": 34, "character": "Venture Star Crew Chief", "credit_id": "52fe48009251416c750aca63", "gender": 2, "id": 42317, "name": "Scott Lawrence", "order": 14}, {"cast_id": 35, "character": "Lock Up Trooper", "credit_id": "52fe48009251416c750aca67", "gender": 2, "id": 986734, "name": "Kelly Kilgour", "order": 15}, {"cast_id": 36, "character": "Shuttle Pilot", "credit_id": "52fe48009251416c750aca6b", "gender": 0, "id": 1207227, "name": "James Patrick Pitt", "order": 16}, {"cast_id": 37, "character": "Shuttle Co-Pilot", "credit_id": "52fe48009251416c750aca6f", "gender": 0, "id": 1180936, "name": "Sean Patrick Murphy", "order": 17}, {"cast_id": 38, "character": "Shuttle Crew Chief", "credit_id": "52fe48009251416c750aca73", "gender": 2, "id": 1019578, "name": "Peter Dillon", "order": 18}, {"cast_id": 39, "character": "Tractor Operator / Troupe", "credit_id": "52fe48009251416c750aca77", "gender": 0, "id": 91443, "name": "Kevin Dorman", "order": 19}, {"cast_id": 40, "character": "Dragon Gunship Pilot", "credit_id": "52fe48009251416c750aca7b", "gender": 2, "id": 173391, "name": "Kelson Henderson", "order": 20}, {"cast_id": 41, "character": "Dragon Gunship Gunner", "credit_id": "52fe48009251416c750aca7f", "gender": 0, "id": 1207236, "name": "David Van Horn", "order": 21}, {"cast_id": 42, "character": "Dragon Gunship Navigator", "credit_id": "52fe48009251416c750aca83", "gender": 0, "id": 215913, "name": "Jacob Tomuri", "order": 22}, {"cast_id": 43, "character": "Suit #1", "credit_id": "52fe48009251416c750aca87", "gender": 0, "id": 143206, "name": "Michael Blain-Rozgay", "order": 23}, {"cast_id": 44, "character": "Suit #2", "credit_id": "52fe48009251416c750aca8b", "gender": 2, "id": 169676, "name": "Jon Curry", "order": 24}, {"cast_id": 46, "character": "Ambient Room Tech", "credit_id": "52fe48009251416c750aca8f", "gender": 0, "id": 1048610, "name": "Luke Hawker", "order": 25}, {"cast_id": 47, "character": "Ambient Room Tech / Troupe", "credit_id": "52fe48009251416c750aca93", "gender": 0, "id": 42288, "name": "Woody Schultz", "order": 26}, {"cast_id": 48, "character": "Horse Clan Leader", "credit_id": "52fe48009251416c750aca97", "gender": 2, "id": 68278, "name": "Peter Mensah", "order": 27}, {"cast_id": 49, "character": "Link Room Tech", "credit_id": "52fe48009251416c750aca9b", "gender": 0, "id": 1207247, "name": "Sonia Yee", "order": 28}, {"cast_id": 50, "character": "Basketball Avatar / Troupe", "credit_id": "52fe48009251416c750aca9f", "gender": 1, "id": 1207248, "name": "Jahnel Curfman", "order": 29}, {"cast_id": 51, "character": "Basketball Avatar", "credit_id": "52fe48009251416c750acaa3", "gender": 0, "id": 89714, "name": "Ilram Choi", "order": 30}, {"cast_id": 52, "character": "Na'vi Child", "credit_id": "52fe48009251416c750acaa7", "gender": 0, "id": 1207249, "name": "Kyla Warren", "order": 31}, {"cast_id": 53, "character": "Troupe", "credit_id": "52fe48009251416c750acaab", "gender": 0, "id": 1207250, "name": "Lisa Roumain", "order": 32}, {"cast_id": 54, "character": "Troupe", "credit_id": "52fe48009251416c750acaaf", "gender": 1, "id": 83105, "name": "Debra Wilson", "order": 33}, {"cast_id": 57, "character": "Troupe", "credit_id": "52fe48009251416c750acabb", "gender": 0, "id": 1207253, "name": "Chris Mala", "order": 34}, {"cast_id": 55, "character": "Troupe", "credit_id": "52fe48009251416c750acab3", "gender": 0, "id": 1207251, "name": "Taylor Kibby", "order": 35}, {"cast_id": 56, "character": "Troupe", "credit_id": "52fe48009251416c750acab7", "gender": 0, "id": 1207252, "name": "Jodie Landau", "order": 36}, {"cast_id": 58, "character": "Troupe", "credit_id": "52fe48009251416c750acabf", "gender": 0, "id": 1207254, "name": "Julie Lamm", "order": 37}, {"cast_id": 59, "character": "Troupe", "credit_id": "52fe48009251416c750acac3", "gender": 0, "id": 1207257, "name": "Cullen B. Madden", "order": 38}, {"cast_id": 60, "character": "Troupe", "credit_id": "52fe48009251416c750acac7", "gender": 0, "id": 1207259, "name": "Joseph Brady Madden", "order": 39}, {"cast_id": 61, "character": "Troupe", "credit_id": "52fe48009251416c750acacb", "gender": 0, "id": 1207262, "name": "Frankie Torres", "order": 40}, {"cast_id": 62, "character": "Troupe", "credit_id": "52fe48009251416c750acacf", "gender": 1, "id": 1158600, "name": "Austin Wilson", "order": 41}, {"cast_id": 63, "character": "Troupe", "credit_id": "52fe48019251416c750acad3", "gender": 1, "id": 983705, "name": "Sara Wilson", "order": 42}, {"cast_id": 64, "character": "Troupe", "credit_id": "52fe48019251416c750acad7", "gender": 0, "id": 1207263, "name": "Tamica Washington-Miller", "order": 43}, {"cast_id": 65, "character": "Op Center Staff", "credit_id": "52fe48019251416c750acadb", "gender": 1, "id": 1145098, "name": "Lucy Briant", "order": 44}, {"cast_id": 66, "character": "Op Center Staff", "credit_id": "52fe48019251416c750acadf", "gender": 2, "id": 33305, "name": "Nathan Meister", "order": 45}, {"cast_id": 67, "character": "Op Center Staff", "credit_id": "52fe48019251416c750acae3", "gender": 0, "id": 1207264, "name": "Gerry Blair", "order": 46}, {"cast_id": 68, "character": "Op Center Staff", "credit_id": "52fe48019251416c750acae7", "gender": 2, "id": 33311, "name": "Matthew Chamberlain", "order": 47}, {"cast_id": 69, "character": "Op Center Staff", "credit_id": "52fe48019251416c750acaeb", "gender": 0, "id": 1207265, "name": "Paul Yates", "order": 48}, {"cast_id": 70, "character": "Op Center Duty Officer", "credit_id": "52fe48019251416c750acaef", "gender": 0, "id": 1207266, "name": "Wray Wilson", "order": 49}, {"cast_id": 71, "character": "Op Center Staff", "credit_id": "52fe48019251416c750acaf3", "gender": 2, "id": 54492, "name": "James Gaylyn", "order": 50}, {"cast_id": 72, "character": "Dancer", "credit_id": "52fe48019251416c750acaf7", "gender": 0, "id": 1207267, "name": "Melvin Leno Clark III", "order": 51}, {"cast_id": 73, "character": "Dancer", "credit_id": "52fe48019251416c750acafb", "gender": 0, "id": 1207268, "name": "Carvon Futrell", "order": 52}, {"cast_id": 74, "character": "Dancer", "credit_id": "52fe48019251416c750acaff", "gender": 0, "id": 1207269, "name": "Brandon Jelkes", "order": 53}, {"cast_id": 75, "character": "Dancer", "credit_id": "52fe48019251416c750acb03", "gender": 0, "id": 1207270, "name": "Micah Moch", "order": 54}, {"cast_id": 76, "character": "Dancer", "credit_id": "52fe48019251416c750acb07", "gender": 0, "id": 1207271, "name": "Hanniyah Muhammad", "order": 55}, {"cast_id": 77, "character": "Dancer", "credit_id": "52fe48019251416c750acb0b", "gender": 0, "id": 1207272, "name": "Christopher Nolen", "order": 56}, {"cast_id": 78, "character": "Dancer", "credit_id": "52fe48019251416c750acb0f", "gender": 0, "id": 1207273, "name": "Christa Oliver", "order": 57}, {"cast_id": 79, "character": "Dancer", "credit_id": "52fe48019251416c750acb13", "gender": 0, "id": 1207274, "name": "April Marie Thomas", "order": 58}, {"cast_id": 80, "character": "Dancer", "credit_id": "52fe48019251416c750acb17", "gender": 0, "id": 1207275, "name": "Bravita A. Threatt", "order": 59}, {"cast_id": 81, "character": "Mining Chief (uncredited)", "credit_id": "52fe48019251416c750acb1b", "gender": 0, "id": 1207276, "name": "Colin Bleasdale", "order": 60}, {"cast_id": 82, "character": "Veteran Miner (uncredited)", "credit_id": "52fe48019251416c750acb1f", "gender": 0, "id": 107969, "name": "Mike Bodnar", "order": 61}, {"cast_id": 83, "character": "Richard (uncredited)", "credit_id": "52fe48019251416c750acb23", "gender": 0, "id": 1207278, "name": "Matt Clayton", "order": 62}, {"cast_id": 84, "character": "Nav'i (uncredited)", "credit_id": "52fe48019251416c750acb27", "gender": 1, "id": 147898, "name": "Nicole Dionne", "order": 63}, {"cast_id": 85, "character": "Trooper (uncredited)", "credit_id": "52fe48019251416c750acb2b", "gender": 0, "id": 1207280, "name": "Jamie Harrison", "order": 64}, {"cast_id": 86, "character": "Trooper (uncredited)", "credit_id": "52fe48019251416c750acb2f", "gender": 0, "id": 1207281, "name": "Allan Henry", "order": 65}, {"cast_id": 87, "character": "Ground Technician (uncredited)", "credit_id": "52fe48019251416c750acb33", "gender": 2, "id": 1207282, "name": "Anthony Ingruber", "order": 66}, {"cast_id": 88, "character": "Flight Crew Mechanic (uncredited)", "credit_id": "52fe48019251416c750acb37", "gender": 0, "id": 1207283, "name": "Ashley Jeffery", "order": 67}, {"cast_id": 14, "character": "Samson Pilot", "credit_id": "52fe48009251416c750ac9f9", "gender": 0, "id": 98216, "name": "Dean Knowsley", "order": 68}, {"cast_id": 89, "character": "Trooper (uncredited)", "credit_id": "52fe48019251416c750acb3b", "gender": 0, "id": 1201399, "name": "Joseph Mika-Hunt", "order": 69}, {"cast_id": 90, "character": "Banshee (uncredited)", "credit_id": "52fe48019251416c750acb3f", "gender": 0, "id": 236696, "name": "Terry Notary", "order": 70}, {"cast_id": 91, "character": "Soldier (uncredited)", "credit_id": "52fe48019251416c750acb43", "gender": 0, "id": 1207287, "name": "Kai Pantano", "order": 71}, {"cast_id": 92, "character": "Blast Technician (uncredited)", "credit_id": "52fe48019251416c750acb47", "gender": 0, "id": 1207288, "name": "Logan Pithyou", "order": 72}, {"cast_id": 93, "character": "Vindum Raah (uncredited)", "credit_id": "52fe48019251416c750acb4b", "gender": 0, "id": 1207289, "name": "Stuart Pollock", "order": 73}, {"cast_id": 94, "character": "Hero (uncredited)", "credit_id": "52fe48019251416c750acb4f", "gender": 0, "id": 584868, "name": "Raja", "order": 74}, {"cast_id": 95, "character": "Ops Centreworker (uncredited)", "credit_id": "52fe48019251416c750acb53", "gender": 0, "id": 1207290, "name": "Gareth Ruck", "order": 75}, {"cast_id": 96, "character": "Engineer (uncredited)", "credit_id": "52fe48019251416c750acb57", "gender": 0, "id": 1062463, "name": "Rhian Sheehan", "order": 76}, {"cast_id": 97, "character": "Col. Quaritch's Mech Suit (uncredited)", "credit_id": "52fe48019251416c750acb5b", "gender": 0, "id": 60656, "name": "T. J. Storm", "order": 77}, {"cast_id": 98, "character": "Female Marine (uncredited)", "credit_id": "52fe48019251416c750acb5f", "gender": 0, "id": 1207291, "name": "Jodie Taylor", "order": 78}, {"cast_id": 99, "character": "Ikran Clan Leader (uncredited)", "credit_id": "52fe48019251416c750acb63", "gender": 1, "id": 1186027, "name": "Alicia Vela-Bailey", "order": 79}, {"cast_id": 100, "character": "Geologist (uncredited)", "credit_id": "52fe48019251416c750acb67", "gender": 0, "id": 1207292, "name": "Richard Whiteside", "order": 80}, {"cast_id": 101, "character": "Na'vi (uncredited)", "credit_id": "52fe48019251416c750acb6b", "gender": 0, "id": 103259, "name": "Nikie Zambo", "order": 81}, {"cast_id": 102, "character": "Ambient Room Tech / Troupe", "credit_id": "52fe48019251416c750acb6f", "gender": 1, "id": 42286, "name": "Julene Renee", "order": 82}]
~~~
... would be transformed into a much more model-friendly set of columns with 1s and 0s.

![Encoded data](../images/insights/predicting_film_success_2019_08_05/encoded.png "Encoded data")


Testing my model's success
------
I chose to go with a vanilla R-squared (R^2) indication of success. This is the default option for data scientists tackling regression problems, and is simply a measure of how much better my model is than just predicting the mean rating or revenue for each film.
* negative if the model performs worse than just picking the mean. The higher the negative, the worse.
* zero if it the model just picks the mean movie rating or revenue for each movie. 
* above zero if it performs better than the mean, with "1" being the perfect model. 
* Naturally, at some point you choose to stop when your solution is good enough. This definition differs per problem you're solving, but generally 
	- 0.6-0.9 indicates a good model
	- Anything above is too good to be true, pointing to some unfair input variables or overfitting. For instance, I accidentally included row count in my first model run, and since the data was sorted by revenue, my model almost perfectly predicted revenue. 
	- 0-0.6 means you're at least picking _something_ up, but may not be good enough to use for important business decisions, for instance.

Predicting film rating
-----------------
Source file: [film_rating_with_cast_best_regressor.py](https://github.com/rian-van-den-ander/explorations/blob/master/film_success/film_rating_with_cast_best_regressor.py)

For my model selection, I ran the data through a [Hyperparameter grid search](https://towardsdatascience.com/grid-search-for-model-tuning-3319b259367e) using the [XGBoost regressor](https://xgboost.readthedocs.io/en/latest/) library. I tried several other libraries in the grid search, including random forest regressors and a terribly performing neural network. The grid search greatly improved the performance of the vanilla XGBoost regressor, a library which comes highly recommended for speed and accuracy. 

Naturally, accurately predicting a movie rating from purely movie metadata is a bit of a pipe dream. There are a lot of variables that one won't see in the metadata, such as the quality of script, or whether the role was just perfect for Johnny Depp.

That said, the best result I got was R^2 of 0.53. By machine learning standards, this is OK, but nothing to write home about. 53% of the variance beyond the average rating was explained by the model. In other words, it was missing out on a lot, but still clearly predicting most movies that were better or worse than average. 

![Rating predictions](../images/insights/predicting_film_success_2019_08_05/rating_predictions.png "Rating predictions")

Interestingly, this figure shows an intuitive quick win. The model just has to be 'tilted' in order to provide better predictions.

But instead, I decided to analyse what features were most involved in the model's success:

What are the variables most associated with film rating?
------

An output from the XGBoost library provides the importance of features (input variables) it uses for prediction. This must be taken with a slight pinch of salt, given that the model itself has not made perfect predictions. However, the output provides a very clear story:

![Rating feature importances](../images/insights/predicting_film_success_2019_08_05/feature_importances_rating.png "Rating feature importances")

Here, we can see only around 200 of the input variables held any importance at all. The rest were essentially discarded by the algorithm. That's ok! In future, with a better computer, I would simply pick more input variables (crew and cast) and crunch them through an analysis ([LDA](https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation)
?) in advance to pick out those with no correlation to film rating. 

In text form, the variables most associated with film rating were as follows. _Disclaimer: These can just as well be NEGATIVELY affecting the rating, as you might pick up from a couple of the names (horror, teenager). The algorithm just returns the ones with the largest effect on its predictor._

~~~~
('Drama', 0.02771771)
('Film runtime', 0.017870583) - !
('Horror', 0.015099976)
('Animation', 0.010213515)
('John Lasseter', 0.0099559575) - of Pixar fame
('Family', 0.009091541)
('Comedy', 0.009024642)
('Harvey Weinstein', 0.009003568)
('Whoopi Goldberg', 0.008995796) - ?!
('Bill Murray', 0.008862046)
('Action', 0.008832617)
('Documentary', 0.008824027)
('Morgan Creek Productions', 0.008456202)
('Franchise Pictures', 0.008374982)
('Hans Zimmer', 0.008047262)
('DreamWorks Animation', 0.007945064)
('Hospital', 0.007892966)
('Janet Hirshenson', 0.007849025)
('Jason Friedberg', 0.007827318)
('en', 0.0077783377) - English movies
('Teenager', 0.0077319876)
~~~~

Predicting film revenue - an easier task
-----------------
Source file: [film_revenue_with_cast_best_regressor.py](https://github.com/rian-van-den-ander/explorations/blob/master/film_success/film_revenue_with_cast_best_regressor.py)

As one might expect, this would be an easier task, given obvious factors such as: 
* A film's budget is probably a good indicator of whether it was targeted as a box-office hit
* Many high revenue films are superhero movies

Lo and behold, the same method as earlier returned an r-squared of 0.77 for this prediction. In other words, one can build a very good prediction of a film's revenue based purely on inputs known before the film goes public. This has real world consequences: for instance, a cinema could use this to predict how long they'd like to run a film for, ahead of time.

![Revenue predictions](../images/insights/predicting_film_success_2019_08_05/revenue_predictions.png "Revenue predictions")

This looks a lot better than my rating predictions. Sure, there are outliers, but they are fairly evenly spaced above and below the prediction line.

What are the variables most associated with film **revenue**?
------
This list will be less of a surprise. Again, though, the same disclaimer applies. Variables can be negatively affecting revenue, and this model is not perfect. The list confirms the strong connection between budget and revenue. After all, why would one be making films if you did not get return on your investment? 

Unsurprisingly, superhero movies and pixar movies make a strong appearance here, with their keywords, studios, genres and crew dominating the list. Surprisingly, one production manager, Denny Caira, is a bigger predictor than budget. This man clearly has made a name for himself in the industry!

~~~~
('Denny Caira', 0.037734445)
('Film Budget', 0.03122561)
('Adventure', 0.025690554)
('James Cameron', 0.024247296)
('Pixar Animation Studios', 0.022682142)
('David B. Nowell', 0.022539908)
('marvel comic', 0.022318095)
('Terry Claborn', 0.01921264)
('John Williams', 0.015954955)
('3d', 0.014985539)
('Animation', 0.013459805)
('John Ratzenberger', 0.013009616)
('Christopher Boyes', 0.012793044)
('Fantasy', 0.012175937)
('Gwendolyn Yates Whittle', 0.011877648)
('Lucasfilm', 0.011471849)
('Christopher Lee', 0.011401703)
('superhero', 0.010956859)
('Jim Cummings', 0.010577998)
('John Lasseter', 0.010427481)
('Drama', 0.010378849)
~~~~

Bonus: which actors are most associated with...
------
Source file: [film_actors_to_ratings.py](https://github.com/rian-van-den-ander/explorations/blob/master/film_success/film_actors_to_ratings.py), variables modified for revenue.


Note: for this, I ran the algorithm through **more actors** than before, and did not include other variables such as crew or budget. This is purely about the correlation between an actor and film success. That's why the names do not exactly correspond with previous lists.

**Which actors are most associated with film rating?**

~~~~
('Robert Duvall', 0.011352766) - of Godfather fame
('Morgan Freeman', 0.010981469)
('Scarlett Johansson', 0.010919917)
('Paul Giamatti', 0.0108840475)
('Helena Bonham Carter', 0.010548236)
('Jim Broadbent', 0.010294276)
('Harrison Ford', 0.010112257)
('Leonardo DiCaprio', 0.010015999)
('Mark Ruffalo', 0.009964598)
('Matthew Lillard', 0.00989507)
('Ian Holm', 0.009870403)
('Timothy Spall', 0.009850885)
('Philip Seymour Hoffman', 0.009718503)
('Rachel McAdams', 0.00953982)
('Emily Watson', 0.009512347)
('Alan Rickman', 0.009455477)
('Keira Knightley', 0.009296855)
('Eddie Marsan', 0.009277014)
('Stan Lee', 0.0092619965)
('Emma Thompson', 0.009148427)
('Edward Norton', 0.00904271)
~~~~


**Which actors are most associated with film revenue?**

Obviously, Stan Lee does not make a movie producer rich. He simply cameod in all of the Marvel movies. This list shows correlation of actor with top-grossing (generally superhero) movies more than it shows who causes a movie to do well.

~~~~
('Stan Lee', 0.04299625)
('Hugo Weaving', 0.030377517) - "You hear that Mr, Anderson? That is the sound of inevitability. That is the sound of profit"
('John Ratzenberger', 0.024940673) - In every Pixar film
('Frank Welker', 0.018594962)
('Alan Rickman', 0.01844035)
('Gary Oldman', 0.018401919)
('Geoffrey Rush', 0.018003061)
('Christopher Lee', 0.017147299)
('Robbie Coltrane', 0.015522939)
('Ian McKellen', 0.015420574)
('Timothy Spall', 0.0151223475)
('Zoe Saldana', 0.014832611)
('Stellan Skarsgård', 0.014798376)
('Maggie Smith', 0.014290353)
('Will Smith', 0.01418642)
('Tom Cruise', 0.013842676)
('Jeremy Renner', 0.013476725)
('Alan Tudyk', 0.013410641)
('Judi Dench', 0.01316438)
('Leonardo DiCaprio', 0.01244637)
('Liam Neeson', 0.012093888)
~~~~



On including crew 
------
Initially, when building the models, I did not include crew members in the analysis. This was a massive oversight. Including just the top 200 producers, writers and directors in the model improved the R^2 on revenue prediction by from 0.68 to 0.77. 

More impressively, this improved rating prediction from and R-squared of 0.19 to 0.53 - an astounding improvement just by adding one type of variable. More than 30% of the variance in rating is explained by crew members.

Room for improvement
------
My method was not perfect. I discarded a fair amount of useful data, and took shortcuts. If I were to go for the best possible solution, especially to try improve my rating prediction, I would:

* Including ALL data on actors, keywords, genres. This would need a lot more processing power, but would likely help my model pick out many of the outliers, especially those enigmatic actors and directors who aren't just revenue churning machines
* Model training: My XGBoost grid took almost a day to run. Being lazy, I ran it only on revenue. Retuning the model hyperparameters to a rating prediction would slightly improve the prediction thereof.
* Including zero revenue films in my rating prediction, as I was too lazy to change the data preparation phase per prediction
* Doing a PCA or LDA to eliminate any obviously uncorrelated variables
* Run my XGBoost model through a more extreme parameter grid, picking even better parameters 
* Explore a neural network solution, given the sheer size of this problem.

Conclusion
------
Overall, I am pleasantly surprised with the performance of my model. I did not expect to get such good predictions, especially that of film rating. I learnt a bit about the film industry in the process, especially how much crew matter in making a good film.

Code and tools
------
Code: [GitHub](https://github.com/rian-van-den-ander/explorations/blob/master/film_success/film_rating_with_cast_best_regressor.py)



Tools: Python, xgboost

 


