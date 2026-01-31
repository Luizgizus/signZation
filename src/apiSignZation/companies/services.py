from .serializers import CompanySerializer


def create_company(data):
    serializer = CompanySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    return serializer


def update_company(company, data):
    serializer = CompanySerializer(company, data=data)
    if serializer.is_valid():
        serializer.save()
    return serializer


def delete_company(company):
    company.delete()
