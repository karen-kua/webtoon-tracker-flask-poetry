import flask
from views import webtoons
from bson.json_util import loads, dumps
from utils import views, exceptions

api = flask.Blueprint('api', __name__, url_prefix='/api')

api.register_error_handler(
    Exception,
    views.respond_with_base_error
)

api.register_error_handler(
    exceptions.APIException,
    views.respond_with_custom_error
)

api.add_url_rule(
    "/webtoons",
    methods=["GET"],
    view_func=webtoons.get_all_webtoons
)
api.add_url_rule(
    "/webtoons",
    methods=["POST"],
    view_func=webtoons.add_webtoon
)
api.add_url_rule(
    "/webtoons/<id>",
    methods=["PUT"],
    view_func=webtoons.edit_webtoon
)
api.add_url_rule(
    "/webtoons/<id>",
    methods=["DELETE"],
    view_func=webtoons.delete_webtoon
)
