from .serializers import DocumentSerializer


def create_document(data, actor_id):
    serializer = DocumentSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save(created_by_id=actor_id)
    return serializer


def update_document(document, data, actor_id):
    serializer = DocumentSerializer(document, data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save(updated_by_id=actor_id)
    return serializer


def delete_document(document):
    document.delete()


def sign_document(document, data, actor_id):
    payload = data.copy()
    payload['name'] = document.name
    payload['company'] = document.company_id
    payload['signed'] = True
    serializer = DocumentSerializer(document, data=payload)
    serializer.is_valid(raise_exception=True)
    serializer.save(updated_by_id=actor_id)
    return serializer
