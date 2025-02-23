from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
import os
from datetime import datetime

app = Flask(__name__)

# MongoDB connection
# TODO: Replace this with actual MongoDB URI
# mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017')
mongo_uri = 'mongodb+srv://lizhiyijerry:cXdva5lTxTJQYTGx@jerrycluster0.1etki.mongodb.net/'
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
            'email': email,
            'showers': {}  # Initialize empty showers dictionary
        }
        result = users_collection.insert_one(new_user)
        new_user['_id'] = serialize_object_id(result.inserted_id)
        return jsonify({
            'user': new_user,
            'createdNew': True
        }), 201

@app.route('/api/shower/update', methods=['POST'])
def update_shower_count():
    if not request.json or 'userid' not in request.json or 'date' not in request.json or 'count' not in request.json:
        return jsonify({'error': 'Bad request. userid, date, and count are required.'}), 400

    userid = request.json['userid']
    date = request.json['date']
    count = request.json['count']

    # Validate date format
    try:
        datetime.strptime(date, '%Y-%m-%d')
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    # Validate count
    if not isinstance(count, int):
        return jsonify({'error': 'Count must be an integer.'}), 400

    # Find the user
    user = users_collection.find_one({'userid': userid})
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    # Get the current shower count for the date
    current_count = user.get('showers', {}).get(date, 0)
    new_count = max(0, current_count + count)  # Ensure the new count is not negative

    # Update the shower count
    result = users_collection.update_one(
        {'userid': userid},
        {'$set': {f'showers.{date}': new_count}}
    )

    if result.modified_count > 0:
        updated_user = users_collection.find_one({'userid': userid})
        updated_user['_id'] = serialize_object_id(updated_user['_id'])
        return jsonify({
            'message': 'Shower count updated successfully.',
            'user': updated_user,
            'date': date,
            'previous_count': current_count,
            'new_count': new_count
        })
    else:
        return jsonify({'error': 'Failed to update shower count.'}), 500

@app.route('/api/shower/get', methods=['POST'])
def get_shower_count():
    if not request.json or 'userid' not in request.json or 'date' not in request.json:
        return jsonify({'error': 'Bad request. userid and date are required.'}), 400

    userid = request.json['userid']
    date = request.json['date']

    # Validate date format
    try:
        datetime.strptime(date, '%Y-%m-%d')
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    # Find the user
    user = users_collection.find_one({'userid': userid})
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    # Get the shower count for the specified date
    shower_count = user.get('showers', {}).get(date, 0)

    return jsonify({
        'userid': userid,
        'date': date,
        'shower_count': shower_count
    })

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
