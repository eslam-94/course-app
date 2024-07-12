## Next.js Course App 

use npm install
then goto http://localhost:3000/

# firestore setting

add connection details to firestore in this file
app/lib/firestoresetting.ts

# env 
create .env file contains

AUTH_SECRET="xxx-xxx-xxx-xxx"
EMAIL_PROVIDER="xxx@gmail.com"
EMAIL_PROVIDER_PASS="xxxx xxxx xxxx xxxx"
EMAIL_HOST="smtp.gmail.com"

# Data structure in firestore

1. make a collection named 'lessons'
2. create a document with id [lesson-name] which will be used in url /course/[lesson-name]
3. each document has index, name, sections properties
4. sections is an array inwhich items has codeSnippet, content, title, video 