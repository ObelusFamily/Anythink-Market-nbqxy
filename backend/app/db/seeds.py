from sqlalchemy import create_engine
from sqlalchemy.sql import text
import random
import string
import os


DATABASE_URL = os.environ['DATABASE_URL'].replace("postgres://", "postgresql://")
ENGINE = create_engine(DATABASE_URL)

INSERT_USER_QUERY = text(
    """INSERT INTO users(username, email, salt, bio, hashed_password) VALUES(:username, :email, :salt, :bio, :hashed_password)""")
SELECT_LAST_USER_ID_QUERY = text("""SELECT ID FROM users ORDER BY id DESC LIMIT 1""")
INSERT_ITEM_QUERY = text(
    """INSERT INTO items(slug, title, description, seller_id) VALUES(:slug, :title, :description, :seller_id)""")
SELECT_LAST_ITEM_ID_QUERY = text("""SELECT ID FROM items ORDER BY id DESC LIMIT 1""")
INSERT_COMMENT_SQL = text(
    """INSERT INTO comments(body, seller_id, item_id) VALUES(:body, :seller_id, :item_id)""")


with ENGINE.connect() as connection:
    for i in range(100):
        username = 'user-' + ''.join(random.choice(string.ascii_letters)
                                     for _ in range(8))

        user = {'username': username, 'email': f'{username}@mail.com',
                'salt': f'salt for {username}', 'bio': f'bio for {username}', 'hashed_password': username}
        connection.execute(INSERT_USER_QUERY, **user)

        result = connection.execute(SELECT_LAST_USER_ID_QUERY)
        row = result.first()
        generated_user_id = row['id']

        item = {'slug': f'slug-{username}', 'title': f'item-{i}',
                'description': f'desc for item-{i}', 'seller_id': generated_user_id}
        connection.execute(INSERT_ITEM_QUERY, **item)

        item_result = connection.execute(SELECT_LAST_ITEM_ID_QUERY)
        row = item_result.first()
        generated_item_id = row['id']

        comment = {'body': f'comment-{i}',
                   'seller_id': generated_user_id, 'item_id': generated_item_id}
        connection.execute(INSERT_COMMENT_SQL, **comment)
