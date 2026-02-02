from .serializers import CompanySerializer


def create_company(data, actor_id):
    payload = data.copy()
    payload['created_by'] = actor_id
    serializer = CompanySerializer(data=payload)
    if serializer.is_valid():
        serializer.save()
    return serializer


def update_company(company, data, actor_id):
    payload = data.copy()
    payload['updated_by'] = actor_id
    if 'created_by' not in payload:
        payload['created_by'] = company.created_by_id

    serializer = CompanySerializer(company, data=payload)
    if serializer.is_valid():
        serializer.save()
    return serializer


def delete_company(company):
    company.delete()
