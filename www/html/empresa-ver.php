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

                <h4>VER EMPRESA</h4>
                <h1>PROTAPETE LIMPEZA</h1>

                <div class="business-post highlight">
                    <div class="row">
                        <div class="col-4 image-holder d-none d-sm-block">
                            <img src="./assets/images/thumb-limpeza.jpg" alt="">
                        </div>
                        <div class="col-md-8 col-sm-12">
                            <a href="#" class="info"><span class="fas fa-map-marker-alt"></span> Manutenção em Porto Alegre</a>
                            <h4 class="gray-5">PROTAPETE LAVAGEM DE TAPETES</h4>
                            <p class="gray-5">A Protapete é uma empresa formada para atender todos nossos clientes com atendimento personalizado e de qualidade, atuamos de forma segura, com responsabilidade social e ambiental, nas atividades de Lavagens e Impermeabilizações residenciais e comerciais.</p>
                        </div>
                    </div>

                </div>
                
                <div class="row">
                    <div class="col-6">
                        <button type="button" class="btn btn-lg btn-outline-primary btn-block"><span class="fas fa-heart"></span> Adicionar aos Favoritos</button>
                    </div>
                    <div class="col-6">
                        <a href="proposta-solicitar.php" class="btn btn-lg btn-outline-primary btn-block"><span class="fas fa-folder"></span> Solicitar Proposta</a>
                    </div>
                </div>

                <br><br>
                <h5>Telefone: XX XXXX-XXXX</h5>
                <h5>Website: www.protapetes.com.br</h5>
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
