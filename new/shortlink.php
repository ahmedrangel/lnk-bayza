<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if($_POST["submit"] == "submit"){
        $url = $_POST["url"];
        $shortlink = $_POST["shortlink"];
        
        $myfile = fopen("../links/$shortlink.php", "w") or die("Unable to open file!");
        $txt = "<?php\n";
        fwrite($myfile, $txt);
        $txt = "header('HTTP/1.1 301 Moved Permanently');\n";
        fwrite($myfile, $txt);
        $txt = "header('Location: $url');\n";
        fwrite($myfile, $txt);
        $txt = "exit();\n";
        fwrite($myfile, $txt);
        $txt = "?>";
        fwrite($myfile, $txt);
        fclose($myfile);
    }
}


?>
<html>
  <head>
    <title>Bayza shortlinks</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  </head>
  <body class="bg-dark d-flex">
    <div class="container m-auto">
<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
?>

      <form action="/new/shortlink" method="post" class="bg-white p-4 rounded">
        <h5>Bayza</h5>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">URL</span>
          </div>
          <input type="url" class="form-control" name="url" id="url" placeholder="https://..." required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">https://lnk.bayza.ml/</span>
          </div>
          <input type="text" class="form-control" name="shortlink" id="shortlink" placeholder="TuLink" required>
        </div>
        <button class="btn btn-danger btn-block" type="submit" name="submit" id="submit" value="submit">Short link</button>
      </form>
<?php
}
else {
?>
      <div class="bg-white p-4 rounded">
        <h5>Tu link ha sido creado</h5>
        <p><a href="/<?= $shortlink ?>">https://lnk.bayza.ml/<?= $shortlink ?></a></p>
        <a type="button" class="btn btn-danger btn-block" href="/new/shortlink">OK</a>
      </div>
<?php
}
?>
    </div>
  </body>
</html>