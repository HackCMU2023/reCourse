import json

import openai

openai.api_key_path = "openai.key"

def getEmbedding(text, model="text-embedding-ada-002"):
   text = text.replace("\n", " ")
   return openai.Embedding.create(input = [text], model=model)['data'][0]['embedding']

with open("f23.json", "r") as f:
    semData = json.load(f)

allCourseData = semData["courses"]
for courseNum, courseData in allCourseData.items():
    description = courseData["desc"]
    descEmbedding = getEmbedding(description)

    print(courseNum)
    print(description)
    print(descEmbedding)
    break
