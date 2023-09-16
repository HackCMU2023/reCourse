import json, time

import openai

openai.api_key_path = "openai.key"

def getEmbedding(text, model="text-embedding-ada-002"):
   text = text.replace("\n", " ")
   return openai.Embedding.create(input = [text], model=model)['data'][0]['embedding']

with open("f23.json", "r") as f:
    semData = json.load(f)

allCourseData = semData["courses"]
courseDescriptionEmbeddings = {}

try:
    seenLast = False
    for courseNum, courseData in allCourseData.items():
        # Filter out some courses for now!
        if courseNum[:2] not in ["15", "16", "08", "02", "11", "05", "10", "17", "18", "60", "54"]:
            continue

        if courseNum == "16-822":
            seenLast = True

        if not seenLast:
            continue

        print(courseNum)
        description = courseData["desc"]

        if description is None:
            continue

        descEmbedding = getEmbedding(description)
        time.sleep(1.5)

        courseDescriptionEmbeddings[courseNum] = descEmbedding
except Exception as e:
    print(e)

with open("f23embeddings.json", "w+") as f:
    json.dump(courseDescriptionEmbeddings, f)    
