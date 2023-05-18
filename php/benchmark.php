<?php

class Benchmark
{
    public function test_benchmark(bool $systemInfo = false): array
    {
        $result = [];
        $result['version'] = '1.6';

        if ($systemInfo) {
            $result['sysinfo']['time'] = date('Y-m-d H:i:s');
            $result['sysinfo']['php_version'] = PHP_VERSION;
            $result['sysinfo']['platform'] = PHP_OS;
            $result['sysinfo']['server_name'] = $_SERVER['SERVER_NAME'];
            $result['sysinfo']['server_addr'] = $_SERVER['SERVER_ADDR'];
            $result['sysinfo']['xdebug'] = in_array('xdebug', get_loaded_extensions());
        }

        $timeStart = microtime(true);

        $this->test_math($result);
        $this->test_string($result);
        $this->test_loops($result);
        $this->test_ifelse($result);

        $result['benchmark']['calculation'] = $this->timer_diff($timeStart).' sec.';

        $result['benchmark']['total'] = $this->timer_diff($timeStart).' sec.';

        return $result;
    }

    private function test_math(&$result, $count = 99999): void
    {
        $timeStart = microtime(true);

        for ($i = 0; $i < $count; ++$i) {
            sin($i);
            asin($i);
            cos($i);
            acos($i);
            tan($i);
            atan($i);
            abs($i);
            floor($i);
            exp($i);
            is_finite($i);
            is_nan($i);
            sqrt($i);
            log10($i);
        }

        $result['benchmark']['math'] = $this->timer_diff($timeStart).' sec.';
    }

    private function test_string(&$result, $count = 99999): void
    {
        $timeStart = microtime(true);

        $string = 'the quick brown fox jumps over the lazy dog';
        for ($i = 0; $i < $count; ++$i) {
            addslashes($string);
            chunk_split($string);
            metaphone($string);
            strip_tags($string);
            md5($string);
            sha1($string);
            strtoupper($string);
            strtolower($string);
            strrev($string);
            strlen($string);
            soundex($string);
            ord($string);
        }
        $result['benchmark']['string'] = $this->timer_diff($timeStart).' sec.';
    }

    private function test_loops(&$result, $count = 999999): void
    {
        $timeStart = microtime(true);
        for ($i = 0; $i < $count; ++$i) {
        }

        $i = 0;
        while ($i < $count) {
            ++$i;
        }

        $result['benchmark']['loops'] = $this->timer_diff($timeStart).' sec.';
    }

    private function test_ifelse(&$result, $count = 999999): void
    {
        $timeStart = microtime(true);
        for ($i = 0; $i < $count; ++$i) {
            if (-1 == $i) {
            } elseif (-2 == $i) {
            } else {
                if (-3 == $i) {
                }
            }
        }
        $result['benchmark']['ifelse'] = $this->timer_diff($timeStart).' sec.';
    }

    private function timer_diff($timeStart): string
    {
        return number_format(microtime(true) - $timeStart, 3);
    }
}