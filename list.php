<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
$card = json_decode($inputJSON, TRUE);
// Vérifier la validité du card et l'ajouter:
// En BDD -> C'est ce qu'il faut faire dans un vrai projet
// === Dans un fichier ===
$file_name = "data.json";
$cards = [];
if (file_exists($file_name)) {
    // chargement de la liste des cards depuis le fichier
    $cards = json_decode(file_get_contents($file_name), true);
}

$json_text = json_encode($cards);
echo $json_text;