<!DOCTYPE html>
<html>

<head>
    <title>Product Insert Form</title>
</head>

<body>
    <h2>Insert Product</h2>
    <form action="http://node-container:3000/" method="POST">
        <label for="name">Product Name:</label>
        <input type="text" name="name" id="name" required><br><br>

        <label for="price">Price:</label>
        <input type="number" step="0.01" name="price" id="price" required><br><br>

        <input type="submit" value="Insert">
    </form>
</body>

</html>
<?php

$url = 'http://node-container:3000/';

$postData = array(
    'price' => 'valor1',
    'name' => 'valor2'
);

$options = array(
    'http' => array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => http_build_query($postData)
    )
);

$context  = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === false) {
    echo 'Erro ao enviar a solicitação.';
} else {
    echo 'Resposta do servidor: ' . $response;
}
?>

