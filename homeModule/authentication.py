from rest_framework.authentication import TokenAuthentication as BaseTokenAuth


class TokenAuthenticationCustom(BaseTokenAuth):
    keyword = 'Karim'
