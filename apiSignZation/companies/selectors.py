from .models import Company


def list_companies():
    return Company.objects.filter(deleted=False)


def get_company_by_id(company_id):
    return Company.objects.get(pk=company_id, deleted=False)
