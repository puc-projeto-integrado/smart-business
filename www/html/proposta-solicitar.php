<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Business | Ver Empresa</title>
    <link rel="stylesheet" href="./assets/css/dist/bootstrap-min.css" />
    <link rel="stylesheet" href="./assets/css/dist/localbusiness-min.css" />
    <link rel="stylesheet" href="./assets/fontawesome-free-5.15.1-web/css/all.min.css" />
</head>
<body>

    <? require './inc-header.php';?>

    <main class="container">
        <div class="row">
            <div class="col-sm-12 col-md-8  pt-5">

                <h4>SOLICITAR PROPOSTA</h4>
                <h1>PROTAPETE LIMPEZA</h1>
                
                <form>
                    <div></div><label for="email">Email:</label><input type="email" name="email" class="form-control" value="tcc@pucminas.br"><label for="password" class="mt-3">Senha:</label><input type="password" name="password" class="form-control" value="123456"><div class="row"><div class="col-12"><button type="submit" class="btn btn-primary btn-block mt-3">ENVIAR</button></div></div><div class="row"><div class="col-12">
                    </div></div>
                    </form>

                <br><br>
                <img src="./assets/images/google-ads-1.png" alt="">
            </div>

            <div class="col-4 d-none d-sm-block pt-5">
                <? require './inc-home-column.php';?>
            </div>
        </div>

        
    </main>

<? require './inc-footer.php'; ?>

</body>
</html>
