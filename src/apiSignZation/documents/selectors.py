from .models import Document


def list_documents():
    return Document.objects.all()


def get_document_by_id(document_id):
    return Document.objects.get(pk=document_id)
