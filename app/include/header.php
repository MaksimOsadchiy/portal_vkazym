<header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-xxl flex-container">
            <a class="navbar-brand" href="#"><img src="assets/image/car.png" alt="car" width="64" height="64"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav2">
                    <li class="nav-item">
                        <a class="first-line" href="<?php echo BASE_URL ?>" aria-current="page">
                            <span class="First-line">Верхнеказымское ЛПУМГ</span><br>
                            <span class="second-line"><?php echo $pageTitle; ?></span>
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <?php foreach ($menuItems as $item): ?>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo $item['url']; ?>"><?php echo $item['label']; ?></a>
                        </li>
                    <?php endforeach; ?>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown list-references"></li>
                </ul>
            </div>

        </div>
    </nav>
</header>