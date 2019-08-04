---
layout: post
title: Encoding a column of JSON Data within a Pandas dataframe
type: code
---

I have been building a machine learning kernel to predict a movie's success based purely on metadata known before a movie's release. Whilst doing this, I came across an interesting problem. I would assume that certain genres of movies (for instance, comic universe movies) are more associated with success than others (documentaries). The "genres" column of the data I have from TMDB provides a JSON list of genres of each movie. However, to input this data into an off-the-shelf machine learning library, these genres should be encoded into columns. For instance, if a movie had two genres in the JSON, "action" and "adventure," the dataset should instead have columns "action" and "adventure" with a 1 value in each, and 0 values for other genres which have their own corresponding columns.

In the [dataset](https://www.kaggle.com/tmdb/tmdb-movie-metadata), there are JSON lists embedded within columns. Case in point, the "genres" column:

![JSON movie data](../images/algo/encoding_json/data.png "JSON movie data")

I could not find an algorithm which does this. One probably did exist. Now one definitely does!

The python code follows. I've also put it in [this respository](https://github.com/rian-van-den-ander/encode_json_data_within_dataframe).

Here is the input the code could take, in terms of a dataframe. I also provide a column index to encode (1) and the JSON tag of the data I'm looking for ("id").

![JSON movie data](../images/algo/encoding_json/input.png "Algorithm input")

And the provided output. You will see that each genre has now become a column of its own.

![JSON movie data](../images/algo/encoding_json/output.png "Algorithm output")

Success! Of course, the dataset is a lot larger with many more such JSON columns, but you get the idea.

Since we could be dealing with thousands of potential codes, I have also provided paramters to limit the amount of codes (columns) generated, as well as a parameter to specify whether I want to delete a row that didn't have a "1" in any of these encoded columns, in order to potentially improve model accuracy.

~~~~

""" #example usage
dataset = pd.read_csv('tmdb_5000_movies.csv')
dataset = dataset[["revenue","genres"]]
dataset = dataset[0:2]

encode_json_column(dataset,1,"id",5,1)
"""

import pandas as pd
import json
import operator

def is_json(myjson):
    try:
        json_object = json.loads(myjson)
    except:
        return False
    return True

def encode_json_column(pandas_data_frame, json_column_index=0, json_id_column="id", encodinglimit = 1000, remove_non_encoded = 1):
      
    X = pandas_data_frame.iloc[:, :].values

    #create a list of codes you want to take, based on encodinglimit
    all_encodedcolumns = {}
    
    for row in X:                    
        if(is_json(row[json_column_index])): #some data is just not json. ignore            
            #for each feature in the json
            for json_features in json.loads(row[json_column_index]):
                #pick out its id (the json identifier you specifc in json_id_column)
                featureid = json_features[json_id_column]                
                #if this id hasn't been seen yet, add it to the dataframe with default 0
                if featureid not in all_encodedcolumns:
                    all_encodedcolumns[featureid] = 1                   
                #else just set it to 1 here
                all_encodedcolumns[featureid] += 1

    top_encodedcolumns = sorted(all_encodedcolumns.items(), key=operator.itemgetter(1), reverse=True)
    
    if encodinglimit < len(top_encodedcolumns):
        top_encodedcolumns = top_encodedcolumns[:encodinglimit]        

    top_encodedcolumns = dict(top_encodedcolumns)

    #keep track of whether a column has been encoded into the dataframe already, else we'd reset all the values to 0
    df_encodedcolumns = []
    count = 0
    
    #for each row in the data
    for row in X:
        
        #keep track of whether this row can be kept or not, based on if it has an encoded value
        has_an_encoded_value = 0
        
        if(is_json(row[json_column_index])): #some data is just not json. ignore
            
            #for each feature in the json
            for json_features in json.loads(row[json_column_index]):
                
                #pick out its id (the json identifier you specifc in json_id_column)
                featureid = json_features[json_id_column]
                                
                if featureid in top_encodedcolumns:

                    #if this id hasn't been seen yet, add it to the dataframe with default 0
                    if featureid not in df_encodedcolumns:
                        df_encodedcolumns.append(featureid)
                        pandas_data_frame[featureid]=0
                   
                    #else just set it to 1 here
                    pandas_data_frame[featureid][count] = 1
                    
                    has_an_encoded_value = 1
    
        if has_an_encoded_value == 0 & remove_non_encoded == 1:
            pandas_data_frame.drop(pandas_data_frame.index[count])
        else:
          count+=1

    #drop the original json column
    pandas_data_frame = pandas_data_frame.drop(pandas_data_frame.columns[json_column_index], 1)
    
    return pandas_data_frame

~~~~

Now I can proceed with the real work - the machine learning!

