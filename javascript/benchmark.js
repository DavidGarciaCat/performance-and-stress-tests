const os = require('os');
const { performance } = require('perf_hooks');

class Benchmark {
    test_benchmark(systemInfo = false) {
        let result = {
            'benchmark': {
                'math': null,
                'string': null,
                'loops': null,
                'ifelse': null,
                'total': null,
            },
            'sysinfo': {
                'time': null,
                'node_version': null,
                'platform': null,
                'server_name': null,
            },
            'version': '1.0'
        };

        if (systemInfo) {
            result['sysinfo'] = {};
            result['sysinfo']['time'] = new Date().toISOString();
            result['sysinfo']['node_version'] = process.version;
            result['sysinfo']['platform'] = os.platform();
            result['sysinfo']['server_name'] = os.hostname();
        }

        let timeStart = performance.now();

        result['benchmark']['math'] = this.test_math();
        result['benchmark']['string'] = this.test_string();
        result['benchmark']['loops'] = this.test_loops();
        result['benchmark']['ifelse'] = this.test_ifelse();
        result['benchmark']['total'] = (performance.now() - timeStart).toFixed(3);

        return result;
    }

    test_math(count = 99999) {
        let timeStart = performance.now();
        for (let i = 0; i < count; i++) {
            Math.sin(i);
            Math.asin(0); // asin(i) is not valid for all i in JavaScript.
            Math.cos(i);
            Math.acos(0); // acos(i) is not valid for all i in JavaScript.
            Math.tan(i);
            Math.atan(i);
            Math.abs(i);
            Math.floor(i);
            Math.exp(i);
            isFinite(i);
            isNaN(i);
            Math.sqrt(i);
            Math.log10(i);
        }
        return (performance.now() - timeStart).toFixed(3)
    }

    test_string(result, count = 99999) {
        let timeStart = performance.now();
        let s = 'the quick brown fox jumps over the lazy dog';
        for (let i = 0; i < count; i++) {
            JSON.stringify(s);
            Buffer.from(s);
            s.toUpperCase();
            s.toLowerCase();
            s.split('').reverse().join('');
            s.length;
            s.charCodeAt(0);
        }
        return (performance.now() - timeStart).toFixed(3)
    }

    test_loops(result, count = 999999) {
        let timeStart = performance.now();
        for (let i = 0; i < count; i++) {
        }

        let i = 0;
        while (i < count) {
            i++;
        }

        return (performance.now() - timeStart).toFixed(3)
    }

    test_ifelse(result, count = 999999) {
        let timeStart = performance.now();
        for (let i = 0; i < count; i++) {
            if (i == -1) {
            } else if (i == -2) {
            } else {
                if (i == -3) {
                }
            }
        }
        return (performance.now() - timeStart).toFixed(3)
    }
}

module.exports = Benchmark;
