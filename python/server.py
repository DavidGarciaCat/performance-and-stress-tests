from http.server import BaseHTTPRequestHandler, HTTPServer
from datetime import datetime
import json
from benchmark import *


class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = json.dumps({'server': 'python', 'hello': 'world'})
            self.wfile.write(response.encode('utf-8'))
        elif self.path == '/loop':
            start = datetime.now()
            for i in range(1, 1000000001):
                pass
            end = datetime.now()
            elapsed_time = end - start
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = json.dumps({'server': 'python', 'hello': 'world',
                                  'loop': 1000000000, 'elapsedTime': elapsed_time.total_seconds() * 1000})
            self.wfile.write(response.encode('utf-8'))
        elif self.path == '/benchmark':
            benchmark = test_benchmark(system_info=True)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = json.dumps(benchmark)
            self.wfile.write(response.encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()


def run(server_class, handler_class, port):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Server is running on port {port}')
    httpd.serve_forever()


run(HTTPServer, MyHandler, 8002)
