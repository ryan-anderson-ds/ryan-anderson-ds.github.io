---
layout: post
title: Will they be judged to be an asshole? A Natural Language Processing example with Convolutional Neural Networks and Embedding
type: code
---

I came across a [well-prepared dataset](https://blog.dvc.org/a-public-reddit-dataset) recently, with data scraped from the ["Am I The Asshole?"](https://www.reddit.com/r/AmItheAsshole/) (AITA) subreddit on reddit. The dataset provides almost 10000 AITA posts, along with the responding reddit users' judgement: based on the question posed by the original author, the redditors judge whether they behaved like an asshole in the situation. In the original post with dataset, the author focused mostly on the dataset and only dabbled in creating a model, but cited 62% accuracy predicting whether the individual would be judged an asshole based on their post, and cited another source obtaining 61% with the popular BERT architecture. I thought it would be a great example to learn how to truly tweak Convolutional Neural Networks (CNNs) and Embedding to a Natural Language Processing (NLP) problem, and obtained just over 73% accuracy with the method. This is not a tutorial - there are plenty of great tutorials on CNNs and Embedding out there. This is rather a complete code example, with reasons for each decision.

More on "Am I The Asshole?" and the dataset
------
Firstly, kudos to the [original author](https://dvc.org/blog/a-public-reddit-dataset) for such a well-prepared and cleaned dataset, which you can obtain from the link.

In AITA, individuals post stories (in English) about themselves and others, and strangers on the internet decide, based on the usually biased story and little context, whether the person is an asshole or not. Yes, it is a dubious concept.

![AITA posts](../images/code/aita/aita-posts.PNG "AITA posts")

In each post, which are largely referencing relationship problems, commenters comment whether they believe the person was the asshole in the situation. The dataset has aggregated these comments, and classified them - either Asshole = 1, or Asshole = 0. You will notice that there is an option for "everyone sucks." In this case, the user is still deemed an asshole.

![The data](../images/code/aita/df.PNG "The data")

Starting intuition
------
This is a complicated domain - more than just analyzing sentiment of the original poster here, we are going to have to model the judgement based on the personality and situation they portray via their writing.

My first intuition on the problem is that users on reddit have specific biases. Reddit is a website dominated by American males of age 20-35, and after all, it is an internet forum. This comes with corresponding biases to certain words that users will use in their AITA stories. Secondly, the type of users frequenting a reddit where users judge people based purely on small passages of text is surely not a representative sample of the English-speaking population. There must be certain language patterns that trigger them to vote in certain directions. So whilst a model won't be able to pick up all the nuances of the situation, it should be able to pick up on the biases.

To add to that, depending on a person's emotions, general temperament, and implicit feelings around the problem they are describing, they will use different language. I expect our neural network to pick up these differences. For instance, an asshole describing relationship problems is probably likely to use a lot of "me versus them" language, as opposed to "us versus the problem," and might even resort to name-calling or bad language.

So my intuition, helped of course by the original post describing 62% accuracy, is that we can indeed somewhat predict reddit's voting here. However, there must be some cases we can't. Often, problems will be well described and describe intricate social issues in ways that simple NLP can't yet understand. 

One pitfall with this dataset is that it does somewhat simplify the problem in the same manner that a voting system does. If a post received 51% votes that the user is not an asshole, then that is the result. The user is an asshole. 1. Looking at this as a linear regression problem would be equally interesting, but for this example we're tackling it as a classification problem. If we looked at is a regression problem, my intuition is that we would probably get better results because accuracy is lost on near-50% examples, where the dataset has made a very distinct choice, but an algorithm may be off by 1% and therefore get the wrong answer.

The code, explained
------
The python code obtaining 73% accuracy on the dataset is [here](https://github.com/rian-van-den-ander/explorations/blob/master/aita/aita_cnn.py). Once you obtain the dataset linked above, you can run it easily assuming you have all dependencies installed - the network takes roughly 3 minutes per epoch.

Below, I'll describe each section, excluding the imports.

Fetching the data
------

This is standard. We are fetching the data CSV, and choosing our input vector, X, and binary output, y. We are then splitting the data into training and test data. The dataset is large - almost 10,000. Therefore, many other train_test_split splits would have worked, too, but we can go with the standard practice.

Secondly, if you had a good look at the dataset already, you'll notice we're losing some information by using just a single field in X. There is also a "title" field which contains the title which users no doubt read, and developed bias from.

~~~~
import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv('../../data/aita/aita_clean.csv')
X = df['body'].values
X= X.astype(str)
y = df['is_asshole'].values
X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2)
~~~~

After this, we now have roughly 8000 mappings of text ("Am I an asshole for...") to judgement (1).

Tokenizing the data
------
In order to provide a valid input to the neural network, we need to tokenize _each_ word in each row of the data. This means that rather than a word, we'll have a mapping to a giant dictionary of Token:Word, e.g. a sentence "Am I The Asshole?" would tokenize 1:"Am", 2: "I", 3: "The", 4:"Asshole"

Rather than now represent each sentence in text, it would be a vector: [1, 2, 3, 4]. A second sentence "The Asshole Am I" would now vectorize to [3, 4, 1, 2], and a sentence with new words would just add to the token list.

* num_words is the amount of words in the dictionary. This was chosen by looking at the tokenizer results. After the first 9000 most occuring words in the dataset, we start to hit typos, strange acronyms and words that are only used once. These aren't useful to train the network, so they should be discarded. The result of this is that the amount of words covered by the word embedding (section below), increases from 51% to 95%. We are now working with a good corpus of words that are well-known by word embeddings, therefore mostly commonly used words but with 5% of words that might be reddit specific, hence great for training the network.
* Here, there is also a two row workaround in manually setting the tokenizer's word index, resolving a known issue with Tokenizer. This does not affect the model output, but does make training time remarkably faster because it manually reduces the tokenizer size to 9000. 
* maxlen is the maximum length of the input text from reddit. For our algorithm, we need each post to be a list of tokens of equal length. For instance, if maxlen was 10, a short post of only 5 words would be padded with zeroes: [1 52 3 10 3 0 0 0 0 0], whereas a long post of 15 words would be limited to 10. We are losing data in super long posts here, but very few are over 1000 words. Setting this to 500 words reduced model accuracy, but 1000 words turned out to be the sweet spot.

~~~~
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences

tokenizer = Tokenizer() 
tokenizer.fit_on_texts(X_train)

num_words=9000
tokenizer.word_index = {e:i for e,i in tokenizer.word_index.items() if i <= num_words}
tokenizer.word_index[tokenizer.oov_token] = num_words + 1

X_train = tokenizer.texts_to_sequences(X_train)
X_test = tokenizer.texts_to_sequences(X_test)
vocab_size = len(tokenizer.word_index) + 1

maxlen = 1000
X_train = pad_sequences(X_train, padding='post', maxlen=maxlen)
X_test = pad_sequences(X_test, padding='post', maxlen=maxlen)
~~~~

Embeddings
-----
By tokenizing, we turn each row into a more mathematical vector of words, e.g. [1 52 3 10 3 0 0 0 0 0]. Being a vector, this is something that we can use as input to a ML model. However, there is an even better way to represent the data.

Embeddings are large pre-trained mappings of related words in an n-dimensional space. For example, as shown below, if we trained a word association model on a large amount of texts, one dimension of associated words it would pick up are on gender. In this dimension, the embedding would be a simple vector indicating that "Man is to woman" as "king is to queen." When using an embedding, you enable the model you train to quickly make these distinctions. If one text refers to their partner as "wife," and another as "girlfriend," the embeddings are a layer in your neural network that have already made these associations! Therefore, your model can be more efficiently trained to consider these words x% similar, and produce similar outputs. For a more intuitive, in-depth explanation, [try this one](https://towardsdatascience.com/neural-network-embeddings-explained-4d028e6f0526).

![Gender, source https://nlp.stanford.edu/projects/glove/)](../images/code/aita/man-woman.jpg "Gender, source https://nlp.stanford.edu/projects/glove/")

So imagine this image below, but with 50 to 300 dimensions. Gender, colour, mood, and so on. That's what [Stanford's Glove library](https://nlp.stanford.edu/projects/glove/) provides, and is the embedding source used in this example.

In the code below, there is a function create_embedding_matrix to process the embedding file into a matrix. This is shamelessly obtained from an [excellent tutorial on text classification with keras](https://realpython.com/python-keras-text-classification/).

~~~~
import numpy as np

def create_embedding_matrix(filepath, word_index, embedding_dim):
    vocab_size = len(word_index) + 1
    embedding_matrix = np.zeros((vocab_size, embedding_dim))

    with open(filepath,encoding='utf-8') as f:
        for line in f:
            word, *vector = line.split()
            if word in word_index:
                idx = word_index[word]
                embedding_matrix[idx] = np.array(
                    vector, dtype=np.float32)[:embedding_dim]

    return embedding_matrix
    

embedding_dim = 50
embedding_matrix = create_embedding_matrix('../../data/embedding/glove/glove.6B.50d.txt', tokenizer.word_index, embedding_dim)

nonzero_elements = np.count_nonzero(np.count_nonzero(embedding_matrix, axis=1))
embedding_accuracy = nonzero_elements / vocab_size
print('embedding accuracy: ' + str(embedding_accuracy))
~~~~

Here, there are only two choices to explain:
* The embedding package to use. I tried Glove and Fasttext. Both produced similar results, but Glove was slightly faster, because it worked equally well with less dimensions.
* embedding_dim is the amount of dimensions of word relations to consider. Glove has options from 50 through to 300. Using more than 50 provided only tiny improvements to the model at the expense of training time.

So, as a result of embedding, rather than an input array mapping some sentences to text
~~~~
[1 52 3 10 3 0 0 0 0 0]
~~~~

We instead have a huge matrix mapping each word to dimensional values! So rather than just a list of words, we essentially have a matrix of _meanings_ for each word in our corpus.

~~~~
[0  dim_1 dim_2 ... dim_n
 1 dim_1 dim_2 ... dim_n
 2  dim_1 dim_2 ... dim_n
 ...
 9000  0     0     ... 0   ]
~~~~

with each dim_ value being an actual representation of that word's value in a dimension, e.g. gender. 

~~~~
[0  0.1 0.8 ... 0.5
 1 0.3 0.2 ... 0.0
 2  0.0 0.4 ... 0.1
 ...
 9000  0   0   ... 0   ]
~~~~

The neural network
-----

~~~~
model = Sequential()
model.add(layers.Embedding(vocab_size, embedding_dim, weights=[embedding_matrix], input_length=maxlen, trainable=True))
~~~~
Firstly, we add an embedding layer to accept the embedding matrix we just made. Trainable = True here because the Glove embedding is not trained on the last 5% of words in our corpus, which may be super useful for the model. There might be differences in embedding dimensions in reddit language use.

~~~~
model.add(layers.Conv1D(64, 5, activation='relu'))
~~~~
Secondly, a convolutional layer to turn this into a CNN. This essentially behaves as a sliding layer of 5 words looking for 64 different filters. In other words, it trains the model to look for 64 different 'meanings,' sliding over the text bit by bit. Whilst I did try different values for both, this amount worked well probably because:
* 64 filters is close to the 50 dimensions used
* 5 words is a good average amount of words to discern meaning from in the input data

~~~~
model.add(Dropout(0.7))
~~~~
A dropout layer (Here, a regularizer would have been an option too). I found that the network, with such a large dataset, was overfitting right after one epoch. To prevent this, the dropout layer simply deactivates a random 70% of the nodes per batch, making sure we don't rely too much on one node in the network. This decreases overfitting, and most models now do their best after around 3 epochs as opposed to 1.

~~~~
model.add(layers.GlobalMaxPooling1D())
~~~~
This is standard practice in CNNs, now reducing the amount of incoming feature vectors, taking only the maximum ones for each dimension.

~~~~
model.add(layers.Dense(10, activation='relu'))
model.add(layers.Dense(1, activation='sigmoid'))
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.summary()
~~~~
Again, standard practice to have another small dense relu layer before a sigmoid output layer for classification. Finally, the model is combined with an adam optimizer and binary_crossentropy loss function, both which are your bread and butter for binary classification neural networks.

~~~~
res = model.fit(X_train, y_train, epochs=5, verbose=True, validation_data=(X_test, y_test), batch_size=50)
~~~~
Now we fit the model. The batch size of 50 was also found through trial and error. Since we have set verbose=True, and each epoch takes around 3 minutes, we can just watch the model learn and decide when it has overtraining based on a decrease in the test data accuracy. Sometimes the model trained to 73% within 1 epoch if lucky, other times it took 3. So 3 are enough, but I have set it to 5 just to see the general decline of accuracy: 

![training](../images/code/aita/training.PNG "training")

Conclusion
-----
The final accuracy I obtained was 73.18%. Playing around with parameters of the neural network seemed to produce marginal improvements, resulting in accuracies between 70% and 73%. My intuition is that for this dataset, there is a domain hard-cap on what a CNN can do, accuracy wise. 

This is probably because the remaining 27% of the AITA posts deal with social and relationship issues that our model simply can't pick up on, the votes are really close to 50-50, or both. Given this, the only potential ways to obtain really large improvements to our model would be significantly changing the model to have a broader understanding of the domain, through either real brute force or embeddings that I have no knowledge of. There is also room for minor improvements, such as using a grid search to really tweak all the inputs, and to use the title of the post in the model.

