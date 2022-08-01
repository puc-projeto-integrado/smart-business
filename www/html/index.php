<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Business</title>
    <link rel="stylesheet" href="./assets/css/dist/bootstrap-min.css" />
    <link rel="stylesheet" href="./assets/css/dist/localbusiness-min.css" />
    <link rel="stylesheet" href="./assets/fontawesome-free-5.15.1-web/css/all.min.css" />
</head>
<body>

    <? require './inc-header.php';?>

    <main class="container">
        <div class="row">
            <div class="col-sm-12 col-md-8  pt-5">

                <? require './inc-home-search.php';?>

                <? require './business-post-highlight.php';?>
                <img src="./assets/images/google-ads-1.png" alt="">
                <? require './business-post-highlight.php';?>

            </div>

            <div class="col-4 d-none d-sm-block pt-5">
                <? require './inc-home-column.php';?>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
            <h3 class="mt-5">Mais Recentes</h3>
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <? require './business-post.php';?>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <? require './business-post.php';?>
                    </div>
                </div>
                <div class="container center mt-3 mb-3">
                    <img src="./assets/images/google-ads-1.png" alt="">
                </div>
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <? require './business-post.php';?>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <? require './business-post.php';?>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <? require './business-post.php';?>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <? require './business-post.php';?>
                    </div>
                </div>
            </div>
        </div>
    </main>

<? require './inc-footer.php'; ?>

</body>
</html>
