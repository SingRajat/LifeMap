import urllib.request
import json

data = json.dumps({'email': 'test@test.com', 'username': 'testuser', 'password': 'password'}).encode('utf-8')
req = urllib.request.Request('http://127.0.0.1:8000/auth/register', data=data, headers={'Content-Type': 'application/json'})

try:
    res = urllib.request.urlopen(req)
    print("Success:", res.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Error:", e.code)
    print("Body:", e.read().decode('utf-8'))
