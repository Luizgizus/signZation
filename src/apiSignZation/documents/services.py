from .serializers import DocumentSerializer


def create_document(data, actor_id):
    payload = data.copy()
    payload['created_by'] = actor_id
    serializer = DocumentSerializer(data=payload)
    if serializer.is_valid():
        serializer.save()
    return serializer


def update_document(document, data, actor_id):
    payload = data.copy()
    payload['updated_by'] = actor_id
    if 'created_by' not in payload:
        payload['created_by'] = document.created_by_id

    serializer = DocumentSerializer(document, data=payload)
    if serializer.is_valid():
        serializer.save()
    return serializer


def delete_document(document):
    document.delete()


def sign_document(document, data, actor_id):
    payload = data.copy()
    payload['name'] = document.name
    payload['signed'] = True
    payload['updated_by'] = actor_id
    if 'created_by' not in payload:
        payload['created_by'] = document.created_by_id
    serializer = DocumentSerializer(document, data=payload)
    if serializer.is_valid():
        serializer.save()
    return serializer
