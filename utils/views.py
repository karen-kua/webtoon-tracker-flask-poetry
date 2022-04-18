import flask
import bson
from http import HTTPStatus


def respond_with_doc(doc, status=HTTPStatus.OK):
    return flask.Response(
        bson.json_util.dumps(doc),
        content_type='application/json',
        status=status
    )


def respond_with_base_error(error):
    return flask.Response(
        flask.json.dumps({"Error": str(error)}),
        content_type='application/json',
        status=HTTPStatus.BAD_REQUEST
    )


def respond_with_custom_error(error):
    return flask.Response(
        flask.json.dumps({"Error": error.message}),
        content_type='application/json',
        status=error.status_code
    )
