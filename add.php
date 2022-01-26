<?php
// ! = =
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
$newCard = json_decode($inputJSON, TRUE);

if(!$newCard['name'] || !$newCard['hp'] || !$newCard['desc'] || !$newCard['mana'] || !$newCard['imageSrc'] || !$newCard['rarity']) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Mauvaise requete", true, 400);
    exit;
}

// Vérifier la validité du champion et l'ajouter:
// En BDD -> C'est ce qu'il faut faire dans un vrai projet
// === Dans un fichier ===
$file_name = "data.json";
$cards = [];
if (file_exists($file_name)) {
    $cards = json_decode(file_get_contents($file_name), true);
}

$duplicate = false;

foreach($cards as $card){
    if($card['name'] == $newCard['name']){
        $duplicate = true;
    }
}

if(!$duplicate){
    array_push($cards, $newCard);
} else{
    header($_SERVER["SERVER_PROTOCOL"] . " 409 Cette carte existe deja", true, 409);
    exit;
}

// Mise à jour du fichier
file_put_contents($file_name, json_encode($cards));