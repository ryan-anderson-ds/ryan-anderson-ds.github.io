---
layout: post
title: Predicting gender from personality test results
type: insights
---

An interesting machine learning classification problem popped up on reddit this month. A user posted [freely available personality test results](https://openpsychometrics.org/_rawdata/) from OpenPsychometrics.org, and the user claimed they managed to predict a respondent's gender with 80% accuracy. I decided to take the challenge, and see what other interesting things I could find from the dataset.

Summary (spoilers)
------
1. It is relatively easy, and unsurprisingly so, to be able to predict a person's gender based on their personality test results. I managed 82% accuracy after a few rounds of model improvements. Using an SVM with some cleaned and engineered data returned the best result.

2. Personality also changes with age. In fact. every single personality trait changes with age and gender.

3. It takes a lot of effort to squeeze an extra percent out of the model accuracy. The vanilla models provided by sklearn or XGBoost can often be good enough for a quick and easy solution.


The data
------
![The data](../images/insights/gender_2019_08_23/data.png "the data")

The data comes from [openpsychometrics.org](https://openpsychometrics.org/_rawdata/). The test is called the [16 Personality Factors](https://en.wikipedia.org/wiki/16PF_Questionnaire), "a comprehensive and widely used measure of normal adult personality," according to The Sage Handbook of Personality Theory and Assessment. The test contains 164 statements about yourself, and uses these to measure 16 personality traits, defined by Raymond Cattell. The traits are relatable, everyday terms:
* Warmth
* Reasoning
* Emotional stability
* Dominance
* Liveliness
* Rule-conciousness
* Social boldness
* Sensitivity
* Vigilance
* Abstractedness
* Privateness
* Apprehensiveness
* Openness to change
* Self-reliance
* Perfectionism
* Tension

The data contains 49159 test results, each result also supplying age, gender, accuracy, country, source, and elapsed time.

Exploratory data analysis and removing bad data
------
The dataset contains labelled columns for each personality test answer, grouped by personality trait. e.g. "A1" marks the first question for the "Warmth" trait.

![The dataset](../images/insights/gender_2019_08_23/dataset.png "the dataset")

It also contains data on age, gender, accuracy (self-rated by the respondent), country, source (where the data came from - there are different institutions running this test), and time elapsed.

![The dataset](../images/insights/gender_2019_08_23/dataset2.png "the dataset")

Age is distributed from 13 to 80 years, and unsurprisingly dominated by the 13-30 range. There were hundreds of null values, which I had to remove.

![Age distribution](../images/insights/gender_2019_08_23/age.png "Age distribution")

Gender can be values 0, 1, 2, 3.

1 and 2 correspond to male and female, although I never did bother figuring out which was which, as that is irrelevant to this analysis.
I removed gender values of 0 and 3, as there were very few of them and they would make this a much more difficult and debate-worthy project. What matters is there are enough of both genders to get a statistically significant result from this.

![Gender distribution](../images/insights/gender_2019_08_23/gender.png "Gender distribution")

Respondent self-rated accuracy centred around the 85% mark. There were some respondents who gave really low marks to the test, and some with NULL accuracy. I removed all those records, as I didn't want bad data.

![Accuracy distribution](../images/insights/gender_2019_08_23/accuracy.png "Accuracy distribution")

The survey time column presented an interesting problem. There was a very long tail, maybe people who had left their browser window open or thought very hard about the problem. I chose to keep all of this data. Perhaps the best results would come from those who took 5000 seconds to do the test. However, there were two clear spikes of less than 300 seconds which almost certainly consisted of cheaters who quickly blazed through the test to see what it was about.

![Survey time distribution](../images/insights/gender_2019_08_23/surveytime.png "Survey time distribution")

I removed any surveys that took less than 300 seconds to complete - essentially chopping off the left 'elbow' from the above data.

![Survey time distribution - chopped](../images/insights/gender_2019_08_23/surveytimechopped.png "Survey time distribution - chopped")

The data now consisted of 43000 rows. I had removed around 6000 surveys, many of them being test cheaters or choosing not to specify their gender or age. Of course, there would have been some good data in here, but that's ok - 43000 is still enough!

The model - vanilla XGBoost
------
Code: [GitHub](https://github.com/rian-van-den-ander/explorations/tree/master/personality_traits/personality_traits_xgboost_tree_no_data_prep.py)



This problem appears to be a non-linear one. I know this because there is certainly a complex relationship between all these personality traits. In other words, a psychologist has drawn arbitrary lines around several 'traits' which made sense to him. Another psychologist would build different ones. The traits are not linearly separable, although the personality test makes an attempt to do so. There are definitely links between some traits, for instance, x7, social boldness, and x11, privateness.

I started with my usual starting point for regression or classification problems: A vanilla XGBoost. From my knowledge, this uses decision trees and gradient boosting, which is generally a good idea when faced with a non-linear problem like this. 

I determined the performance of my model by the percentage of times it could correctly guess the gender. I did this using k-fold cross validation, where the algorithm is run multiple times through different slices of the data to get an average result, just in case your model is lucky with one test set. In other words, instead of returning one accuracy score, the validation returns many which you could average. 

**Baseline result**: Data preparation often gets you most of the way in a classification or regression problem. Without my data preparation, where I removed bad data from the set, XGBoost had a successful prediction rate of **78%**.

**With data prep**: The vanilla XGBoost classifier had a successful prediction rate of **79%**. 

![K-fold](../images/insights/gender_2019_08_23/k-fold.png "K-fold")

Improving the model with a grid search
-------
Code (with my final XGBoost model): [GitHub](https://github.com/rian-van-den-ander/explorations/tree/master/personality_traits/personality_traits_xgboost_tree_best.py)

79% was already a good result, but I obviously wanted to beat the redditor's 80%. 

I did two rounds of a grid search, which runs the above XGBoost model multiple times with different parameters, the most important ones for xgboost usually being max_depth and gamma.

The first round contained a wide range of variables.

~~~python
xgb_model = xgb.XGBClassifier()

params = {
        'min_child_weight': [1, 5, 10, 20],
        'gamma': [0.5, 1, 1.5, 2, 5, 10],
        'subsample': [0.4, 0.6, 0.8, 1.0],
        'colsample_bytree': [0.4, 0.6, 0.8, 1.0],
        'max_depth': [3, 4, 5, 6, 7]
        }


clf = GridSearchCV(xgb_model, params, n_jobs=5,
                   scoring='roc_auc',
                   verbose=2, refit=True)


clf.fit(X_train, y_gender_train)

y_pred = clf.best_estimator_.predict(X_test)
~~~

This scored **81%** - a 2% improvement in prediction. Not bad!

For the second round, I picked the winning model, and ran it with tweaked search variables:

~~~python
params = {
        'min_child_weight': [20,25,30],
        'gamma': [1.8, 2, 2.2],
        'subsample': [0.72, 0.8, 0.88],
        'colsample_bytree': [0.72, 0.8, 0.88],
        'max_depth': [7,8,9],
        'learning_rate': [0.08,0.1,0.12]
        }
~~~

This scored **81.5%**. I could see quickly diminishing returns, so stopped working on this with XGBoost. But could another algorithm do better?

Improving the model with a Support-Vector Machines (SVM)
-------
Code: [GitHub](https://github.com/rian-van-den-ander/explorations/tree/master/personality_traits/personality_traits_svc_best.py)

I had previously read that for non linear problems with only slightly differentiable data - in other words, men and women being fairly similar - SVM is a great model. It works differently to most others. To explain it simply in the terms of this problem, most algorithms would look for the fine differences between a male and a female, and attempt to draw that line. Most would then make mistakes, because it is really hard to find a good fine line.

"No thanks," says SVM. It picks the Sylvester Stallone, the most masculine male, and Scarlett Johannson, the most feminine female. It uses these as comparison points to decide whether someone is a man or a woman. In a world with very fuzzy differences between genders, this works slightly better than the alternative. It wouldn't work well for more binary problems.

However, if my problem is *too* non-linear, SVM would suffer, as it still needs some linear space to work in for most 'kernels' it runs - a kernel being essentially the type of shape it uses to draw between the genders, say a circle around the males. However, you can make it a bit more linear by adding dimensions for this shape to wrap around. 

To do this, I added columns for the relationship between every personality trait. 
First, this meant averaging out all the answers per trait, resulting in 16 columns.

![Averaged traits](../images/insights/gender_2019_08_23/averaged.png "Averaged traits")

Secondly, I added a column for each relationship, such as the relationship between Sensitivity and Dominance. 16 columns became many more.
Finally, I put this through a grid search, to find optimal parameters for the SVM classifier, and again, a k-fold cross validation.

**Result: 82%!** 

Not a huge improvement, but an improvement nevertheless. Success!

Which personality traits predicted gender the best?
------
Code: [GitHub](https://github.com/rian-van-den-ander/explorations/tree/master/personality_traits/gender_feature_importances.py)


Of course, having done this prediction, I wanted to see which personality factors do predict gender well. I used the XGBoost's feature importance algorithm for this. Thanks to confirmation bias, these won't surprise you! Please take note, though, that these are the personality traits that the *model* deemed appropriate. It is possible that a better model exists which comes up with a different set of important features. However, given the good accuracy I got, this is unlikely.

The prediction is absolutely dominated by Sensitivity. However, an important point is that all traits are considered important by the model: all are used for the prediction, and all therefore differ (or the relationship between them differs, since this is non linear) between genders.

![Gender predictors](../images/insights/gender_2019_08_23/genderpredictors.png "Gender predictors")

Bonus: which personality traits predict age the best?
------
Code: [GitHub](https://github.com/rian-van-den-ander/explorations/tree/master/personality_traits/age_feature_importances.py)

I accidentally built an age *classifier* (yes, classifier, so trying to predict a specific age), and got an interesting result. The question "I get chores done right away" was by far the biggest predictor of specific ages.

However, when switching to an age regressor, i.e. trying to predict the general age of someone, the results were more predictable. The 'Abstractedness' personality factor describes how someone tends to be lost in thought, or practical and down to earth.

This was unexpectedly sad. As we get older, we greatly lose our tendency to imagine. 

![Age predictors](../images/insights/gender_2019_08_23/agepredictors.png "Age predictors")

Conclusion
------
1. It is relatively easy, and unsurprisingly so, to be able to predict a person's gender based on their personality test results. I say this is unsurprising for three reasons, firstly because the personality test was developed by a human looking for the biggest traits that separated us. Men and women being generally separable, he would have picked some which he noted between the genders. Secondly, because society is still heavily constructed around gender norms. A very interesting follow up to prove this would be to see, given that this dataset provides the country of the respondent, if countries with more fluid gender norms (say, European countries) were harder to predict gender in than those with very rigid gender norms. Thirdly, because there is evidence that females are biologically more sensitive than males.

2. Personality changes with age! Again, not too surprising for the same first reason above. Age is dominated by abstractedness, which describes our tendency to imagine things versus to be strongly present in, well, the present.

3. If building this for a business problem, a 10 line piece of code without any further model optimisation would have been good enough for most cases. It would've gotten us to 78% accuracy. Applying all of my relevant knowledge only got me to 82%. It is scary how good vanilla algorithms are, and how relatively small the improvement can be for an honest day's work.

Code and tools
------
Code: [GitHub](https://github.com/rian-van-den-ander/explorations/tree/master/personality_traits)

Tools: Python, xgboost



