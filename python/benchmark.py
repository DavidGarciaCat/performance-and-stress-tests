import time
import math
import hashlib
import platform
from datetime import datetime
import os


def test_benchmark(system_info=False):
    result = {
        'sysinfo': {
            'time': None,
            'python_version': None,
            'platform': None,
            'server_name': None,
        },
        'benchmark': {
            'math': None,
            'string': None,
            'loops': None,
            'ifelse': None,
            'total': None,
        },
        'version': 1.0,
    }

    if system_info:
        result['sysinfo'] = {}
        result['sysinfo']['time'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        result['sysinfo']['python_version'] = platform.python_version()
        result['sysinfo']['platform'] = platform.system()
        result['sysinfo']['server_name'] = os.uname()[1]

    time_start = time.time()

    result['benchmark']['math'] = test_math()
    result['benchmark']['string'] = test_string()
    result['benchmark']['loops'] = test_loops()
    result['benchmark']['ifelse'] = test_ifelse()
    result['benchmark']['total'] = round(time.time() - time_start, 3)

    return result


def test_math(count=99999):
    time_start = time.time()
    for i in range(count):
        math.sin(i)
        # math.asin(i)
        math.cos(i)
        # math.acos(i)
        math.tan(i)
        math.atan(i)
        abs(i)
        math.floor(i)
        # math.exp(i)
        math.isfinite(i)
        math.isnan(i)
        math.sqrt(i)
        # math.log10(i)
    return round(time.time() - time_start, 3)


def test_string(count=99999):
    time_start = time.time()
    s = 'the quick brown fox jumps over the lazy dog'
    for i in range(count):
        s.replace("\\", "\\\\").replace("'", "\\'")
        len(s)
        hashlib.md5(s.encode())
        hashlib.sha1(s.encode())
        s.upper()
        s.lower()
        s[::-1]
        len(s)
        s[0]
    return round(time.time() - time_start, 3)


def test_loops(count=999999):
    time_start = time.time()
    for i in range(count):
        pass

    i = 0
    while i < count:
        i += 1

    return round(time.time() - time_start, 3)


def test_ifelse(count=999999):
    time_start = time.time()
    for i in range(count):
        if i == -1:
            pass
        elif i == -2:
            pass
        else:
            if i == -3:
                pass
    return round(time.time() - time_start, 3)
