
<?php require_once 'includes/_functions.php'; ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>FS Poster</title>

    <link rel='icon' href='img/favicon.ico' type='image/x-icon' />
    <link rel="stylesheet" href="css/style.min.css">
</head>

<?php $bg_alabaster = ["features"]; ?>

<body class="<?php print in_array(getCurrentFilename(), $bg_alabaster) ? 'bg-alabaster' : 'bg-white' ?>">
    <div class="overlay-body d-none"></div>