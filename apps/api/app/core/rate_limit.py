from slowapi import Limiter
from slowapi.util import get_remote_address

# Shared limiter instance — imported by main.py (to register the exception
# handler + middleware) and by any router that wants to decorate an endpoint.
limiter = Limiter(key_func=get_remote_address)
