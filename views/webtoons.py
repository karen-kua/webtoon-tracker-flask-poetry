import flask
from http import HTTPStatus

from services import webtoons
from utils.views import respond_with_doc


def add_webtoon():
    try:
        new_webtoon = flask.request.json
        added = webtoons.insert_one(new_webtoon)
        return respond_with_doc(added, HTTPStatus.CREATED)
    except Exception:
        raise

        # TODO: Add after and before request hooks for logging
        # TODO: Connect to the mongodb collection via bash shell


def get_all_webtoons():
    try:
        all_webtoons = webtoons.get_all()
        return respond_with_doc(all_webtoons)
    except Exception:
        raise


def edit_webtoon(id):
    try:
        new_value = flask.request.json
        updated_webtoon = webtoons.edit(id, new_value)
        return respond_with_doc(updated_webtoon)
    except Exception:
        raise


def delete_webtoon(id):
    try:
        deleted_count = webtoons.delete_one(id)
        return '', HTTPStatus.NO_CONTENT
    except Exception:
        raise
