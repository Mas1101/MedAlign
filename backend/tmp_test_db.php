<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=medalign', 'root', 'Lollollol1243');
    echo "CONNECTED";
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
