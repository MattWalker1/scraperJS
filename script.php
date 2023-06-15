<?php
// PHP Data Objects(PDO) Sample Code:
try {
    $conn = new PDO("sqlsrv:server = tcp:webdojo.database.windows.net,1433; Database = WebScraperV1", "mwalker", "{your_password_here}");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "mwalker", "pwd" => "{your_password_here}", "Database" => "WebScraperV1", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:webdojo.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
?>