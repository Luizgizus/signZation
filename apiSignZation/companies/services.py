from .serializers import CompanySerializer


def create_company(data, actor_id):
    serializer = CompanySerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save(created_by_id=actor_id)
    return serializer


def update_company(company, data, actor_id):
    serializer = CompanySerializer(company, data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save(updated_by_id=actor_id)
    return serializer


def delete_company(company):
    company.delete()
