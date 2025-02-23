from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app)

# MongoDB connection
# TODO: Replace this with actual MongoDB URI
# mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017')
mongo_uri = 'mongodb+srv://hacktheCan:gittub5000@cluster1.u9mec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
client = MongoClient(mongo_uri)
db = client['user_database']
users_collection = db['User']

# Helper function to serialize ObjectId
def serialize_object_id(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    return obj

@app.route('/api/user', methods=['POST'])
def create_or_get_user():
    if not request.json or 'userid' not in request.json or 'email' not in request.json:
        return jsonify({'error': 'Bad request. userid and email are required.'}), 400

    userid = request.json['userid']
    email = request.json['email']

    # Check if user exists
    existing_user = users_collection.find_one({'userid': userid})

    if existing_user:
        # User exists, return user data
        existing_user['_id'] = serialize_object_id(existing_user['_id'])
        return jsonify({
            'user': existing_user,
            'createdNew': False
        })
    else:
        # User doesn't exist, create new user
        new_user = {
            'userid': userid,
            'email': email
        }
        result = users_collection.insert_one(new_user)
        new_user['_id'] = serialize_object_id(result.inserted_id)
        return jsonify({
            'user': new_user,
            'createdNew': True
        }), 201

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)

