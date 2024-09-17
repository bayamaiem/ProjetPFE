
<!DOCTYPE html>
<html>
<head>
    <title>{{ $isActive ? 'Votre compte a été activé' : 'Votre compte a été désactivé' }}</title>
</head>
<body>
    <h1>Bonjour!</h1>
    @if ($isActive)
        <p>Votre compte a été activé avec succès. Vous pouvez maintenant vous connecter à votre compte.</p>
        <p><a href="http://localhost:4200/#/login">Cliquez ici pour vous connecter</a></p>

    @else
        <p>Votre compte a été désactivé. Veuillez contacter l'admin pour plus d'assistance.</p>
    @endif
    <p>Merci d'être avec nous!</p>
</body>
</html>

