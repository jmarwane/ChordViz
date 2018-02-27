import http.server
import socketserver

# Serveur http de base delivrant le contenu du repertoire courant via le port indique.
PORT = 5432


Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("",PORT), Handler)
print("�  l'écoute sur le port :", PORT)
httpd.serve_forever()