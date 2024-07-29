<?php 
     include ('../path.php');
    session_start();
    $pageTitle = "АДМИНКА";
    $menuItems = [];
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
    <script>
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
    </script>
    <title>АДМИНКА</title>
</head>
<body>
<script>
    window.location.href = BASE_URL;
</script>
<script src="../assets/js/bootstrap.bundle.min.js"></script>

    <?php include ("../app/include/header.php"); ?>
    <section>
        <div class="container-xl">
            <div class="d-grid gap-5 col-2 ">

            </div>
        </div>
    </section>

</body>
</html>