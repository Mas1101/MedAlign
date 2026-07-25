<?php
$ch = curl_init('http://127.0.0.1:8000/api/login');
$data = json_encode(['email' => 'test@example.com', 'password' => 'password']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$out = curl_exec($ch);
if ($out === false) {
    echo 'CURL ERROR: ' . curl_error($ch);
} else {
    echo $out;
}
curl_close($ch);
