import { hostname } from "https://deno.land/std@0.110.0/node/os.ts";

interface BenchmarkResult {
    benchmark: {
        math: string | null;
        string: string | null;
        loops: string | null;
        ifelse: string | null;
        total: string | null;
    };
    sysinfo: {
        time: string | null;
        node_version: string | null;
        platform: string | null;
        server_name: string | null;
    };
    version: string;
}

class Benchmark {
    test_benchmark(systemInfo: boolean = false): BenchmarkResult {
        let result: BenchmarkResult = {
            'benchmark': {
                'math': null,
                'string': null,
                'loops': null,
                'ifelse': null,
                'total': null,
            },
            'sysinfo': {
                'time': null,
                'deno_version': null,
                'platform': null,
                'server_name': null,
            },
            'version': '1.0'
        };

        if (systemInfo) {
            result['sysinfo']['time'] = new Date().toISOString();
            result['sysinfo']['deno_version'] = Deno.version.deno;
            result['sysinfo']['platform'] = Deno.build.os;
            result['sysinfo']['server_name'] = Deno.env.get('HOSTNAME') || 'unknown';
        }

        let timeStart = performance.now();

        result['benchmark']['math'] = this.test_math();
        result['benchmark']['string'] = this.test_string();
        result['benchmark']['loops'] = this.test_loops();
        result['benchmark']['ifelse'] = this.test_ifelse();
        result['benchmark']['total'] = (performance.now() - timeStart).toFixed(3);

        return result;
    }

    test_math(count: number = 99999): string {
        let timeStart = performance.now();
        for (let i = 0; i < count; i++) {
            Math.sin(i);
            Math.asin(0);
            Math.cos(i);
            Math.acos(0);
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

    test_string(count: number = 99999): string {
        let timeStart = performance.now();
        let s: string = 'the quick brown fox jumps over the lazy dog';
        for (let i = 0; i < count; i++) {
            JSON.stringify(s);
            s.toUpperCase();
            s.toLowerCase();
            s.split('').reverse().join('');
            s.length;
            s.charCodeAt(0);
        }
        return (performance.now() - timeStart).toFixed(3)
    }

    test_loops(count: number = 999999): string {
        let timeStart = performance.now();
        for (let i = 0; i < count; i++) {}

        let i = 0;
        while (i < count) {
            i++;
        }

        return (performance.now() - timeStart).toFixed(3)
    }

    test_ifelse(count: number = 999999): string {
        let timeStart = performance.now();
        for (let i = 0; i < count; i++) {
            if (i == -1) {
            } else if (i == -2) {
            } else {
                if (i == -3) {
                }
            }
        }
        return (performance.now() - timeStart).toFixed(3);
    }
}

export default Benchmark;
