import flask
from utils.exceptions import APIException
from http import HTTPStatus
from bson.objectid import ObjectId
from pymongo import ReturnDocument


def insert_one(webtoon):
    db = flask.current_app.db
    existing_doc = db.webtoons.find_one({"title": webtoon['title']})
    if existing_doc is None:
        added_id = db.webtoons.insert_one(webtoon).inserted_id
        return added_id
    else:
        raise APIException("The webtoon already exists", HTTPStatus.CONFLICT)


def get_all():
    db = flask.current_app.db
    all_webtoons = db.webtoons.find()
    return all_webtoons


def edit(id, new_value):
    db = flask.current_app.db
    updated_webtoon = db.webtoons.find_one_and_update(
        {"_id": ObjectId(id)},
        {'$set': new_value},
        return_document=ReturnDocument.AFTER
    )
    return updated_webtoon


def delete_one(id):
    db = flask.current_app.db
    deleted_count = db.webtoons.delete_one({"_id": ObjectId(id)}).deleted_count
    if deleted_count <= 0:
        raise APIException(
            "The requested webtoon was not found", HTTPStatus.NOT_FOUND)
