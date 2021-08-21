<?php 
    require_once 'includes/head.php';

    $header_links = [
        "Features" => "features.php", "Docs" => "docs.php", 
        "Blog" => "blogs.php", "FAQ" => "faq.php", "Support" => "#"
    ];
?>

<!-- Mobile Menu -->
<section class="mobile_menu">
    <div class="hamburger hamburger--squeeze">
        <span class="hamburger-box">
            <span class="hamburger-inner"></span>
        </span>
    </div>

    <div class="mobile_menu-links d-flex flex-column">
        <?php foreach($header_links as $link => $href): ?>
            <a class="link link-primary link-medium fw-500 <?php print (getCurrentFilename() . '.php' === $href ? 'active' : '') ?>" href="<?php print $href ?>">
                <?php print $link ?>
            </a>
        <?php endforeach ?>
    </div>

    <div class="mobile_menu-btns d-flex flex-column">
        <a class="btn btn-small btn-light mb-3" href="#">BUY NOW - $45</a>
        <a class="btn btn-small btn-primary" href="#">Try demo</a>
    </div>
</section>

<header class="header container-main bg-white border-bottom border-catskill">
    <div class="d-inline-flex align-items-center">
        <div class="d-lg-none d-block hamburger hamburger--squeeze mr-3">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </div>

        <a class="rect-lg-154-44 rect-126-36" href="index.php">
            <img class="w-100 h-100" src="img/logo.svg" alt="Booknetic Saas">
        </a>
    </div>

    <div class="header-links d-lg-inline-flex d-none">
        <?php foreach($header_links as $link => $href): ?>
            <a class="link link-primary link-medium fw-500 <?php print (getCurrentFilename() . '.php' === $href ? 'active' : '') ?>" href="<?php print $href ?>">
                <?php print $link ?>
            </a>
        <?php endforeach ?>
    </div>

    <!-- Desktop buttons -->
    <div class="d-lg-inline-flex d-none">
        <a class="btn btn-small btn-light mr-2" href="#">Try demo</a>
        <a class="btn btn-small btn-primary" href="#">BUY NOW - $45</a>
    </div>

    <!-- Mobile button -->
    <a class="d-lg-none d-flex btn btn-small btn-primary px-3" href="#">BUY - $45</a>
</header>