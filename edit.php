<?php
// ! = =
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}

$inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
$editCard = json_decode($inputJSON, TRUE);

if(!$editCard['name'] || !$editCard['hp'] || !$editCard['desc'] || !$editCard['mana'] || !$editCard['imageSrc'] || !$editCard['rarity']) {
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


$key = array_search($editCard['origin'], array_column($cards, 'name'));

if(isset($key)){
    $cards[$key]['name'] = $editCard['name'];
    $cards[$key]['hp'] = $editCard['hp'];
    $cards[$key]['desc'] = $editCard['desc'];
    $cards[$key]['mana'] = $editCard['mana'];
    $cards[$key]['imageSrc'] = $editCard['imageSrc'];
    $cards[$key]['rarity'] = $editCard['rarity'];
    unset($cards[$key]['origin']);
} else {
    header($_SERVER["SERVER_PROTOCOL"] . "404 Cette carte n'as pas été trouvé", true, 409);
    exit;
}

// Mise à jour du fichier
file_put_contents($file_name, json_encode(array_values($cards)));