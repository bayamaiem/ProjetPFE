
<!DOCTYPE html>
<html>
<head>
    <title>{{ !$etat ? 'Votre demande est acceptée' : 'Votre demande est refusée' }}</title>
</head>
<body>
    <h1>Bonjour!</h1>
    @if (!$etat)
        <p>Nous avons le plaisir de vous informer que votre demande de déchets a été acceptée</p>
    @else
        <p>Nous regrettons de vous informer que votre demande de déchets a été refusée</p>
    @endif
    <p>Merci d'être avec nous!</p>
</body>
</html>

