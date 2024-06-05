from app import get_db
from models import Url

def get_urls():
    session = get_db()
    urls = session.read_transaction(lambda tx: 
        tx.run("MATCH (u:Url) RETURN id(u) AS id, u.url AS url, u.content AS content, u.created_at AS created_at").data()
    )
    url_objects = [Url(id=url['id'], url=url['url'], content=url['content'], created_at=url['created_at']) for url in urls]
    return url_objects
