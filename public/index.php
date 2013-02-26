<?php require('vendors/boiler_utils.php'); ?>
<!doctype html>
<html lang="fr">

<!-- ======================
    HEADER
====================== -->

<head>
    <meta charset="utf-8">
    <title>Yopnote</title>

    <link href="stylesheets/style.css" rel="stylesheet">
    <!--<link rel="shortcut icon" href="favicon.ico">-->
    <script type="text/javascript">window.console||(window.console={log:function(){}});</script>
</head>

<!-- ======================
    CONTENT
====================== -->

<body>



</body>

<!-- ======================
    JAVASCRIPT
====================== -->

<?php
    // Libs
    script_loader('vendors/jquery-1.9.0.min.js');

    script_loader('vendors/mustache/mustache.js');
    script_loader('vendors/mustache/ICanHaz-no-mustache.min.js');
    script_loader('vendors/template_render.js');

    script_loader('vendors/backbone-0.9.2/underscore.min.js');
    script_loader('vendors/backbone-0.9.2/backbone.min.js');

    // App
    script_loader('javascripts/app.js');
    script_loader('javascripts/helpers.js');
    script_loader('javascripts/Router.js');

    script_loader('javascripts/helpers/*');
    script_loader('javascripts/models/*');
    script_loader('javascripts/collections/*');
    script_loader('javascripts/views/*');
?>

<!-- ======================
    TEMPLATES
====================== -->  

<?php
    template_loader('templates/*.html');
?>
</html>
