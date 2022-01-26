<?php
// ! = =
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}

$deletedCard = file_get_contents('php://input'); // récupération du corps de la requete HTTP

// Vérifier la validité du champion et l'ajouter:
// En BDD -> C'est ce qu'il faut faire dans un vrai projet
// === Dans un fichier ===
$file_name = "data.json";
$cards = [];
if (file_exists($file_name)) {
    $cards = json_decode(file_get_contents($file_name), true);
}

foreach($cards as $card){
    if($card['name'] == $deletedCard){
        $key = array_search($deletedCard, array_column($cards, 'name'));
        if(isset($key)){
            unset($cards[$key]);
            break;
        }else {
            header($_SERVER["SERVER_PROTOCOL"] . "404 Cette carte n'as pas été trouvé", true, 409);
            exit;
        }
    } 
}

// Mise à jour du fichier
file_put_contents($file_name, json_encode(array_values($cards)));