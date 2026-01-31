from .serializers import DocumentSerializer


def create_document(data):
    serializer = DocumentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    return serializer


def update_document(document, data):
    serializer = DocumentSerializer(document, data=data)
    if serializer.is_valid():
        serializer.save()
    return serializer


def delete_document(document):
    document.delete()


def sign_document(document, data):
    data['name'] = document.name
    data['signed'] = True
    serializer = DocumentSerializer(document, data=data)
    if serializer.is_valid():
        serializer.save()
    return serializer
