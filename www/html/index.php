<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meus Fornecedores</title>
    <link rel="stylesheet" href="./bootstrap-4.5.2/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="./assets/css/localbusiness.css">
</head>
<body>

    <? require './inc-header.php';?>

    <main class="container">
        <div class="row">
            <div class="col-sm-12 col-md-8  pt-5">

                <? require './inc-home-search.php';?>

                <? require './business-post-highlight.php';?>
                <? require './business-post-highlight.php';?>

            </div>

            <div class="col-4 d-none d-sm-block pt-5">
                <? require './inc-home-column.php';?>
            </div>
        </div>
    </main>
</body>
</html>
