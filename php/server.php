<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/') {
    echo json_encode(['server' => 'php', 'hello' => 'world']);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/loop') {
    $start_time = microtime(true);
    $i = 0;
    while ($i < 1000000000) {
        $i++;
    }
    $end_time = microtime(true);
    $elapsed_time = ($end_time - $start_time) * 1000;
    echo json_encode(['server' => 'php', 'hello' => 'world', 'loop' => $i, 'elapsed_time' => $elapsed_time]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/benchmark') {
    include('benchmark.php');
    $benchmark = (new Benchmark())->test_benchmark(true);
    echo json_encode($benchmark);
} else {
    http_response_code(404);
}
