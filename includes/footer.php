<footer class="footer container-fluid container-main bg-lilac">
    <div class="row">
        <section class="col-lg-3 footer-col--main">
            <a class="rect-lg-154-44 rect-140-40 mx-lg-0 mx-auto" href="index.php">
                <img class="w-100 h-100" src="img/logo.svg" alt="Booknetic Saas">
            </a>

            <p>FS Poster - WordPress auto poster and scheduler plugin.</p>
        </section>

        <?php
            $footer_links = [
                "Company" => [
                    "Home" => "index.php", "Buy now" => "#", "Blog" => "blogs.php", 
                    "Demo" => "#", "FAQ" => "faq.php"
                ],
                "Product" => [
                    "Privacy policy" => "#", "Documentation" => "docs.php", "Support" => "#", 
                    "Video tutorials" => "#", "Suggest a feature" => "#"
                ]
            ];
            
            foreach($footer_links as $header => $links):
        ?>
            <section class="col-lg-3 footer-col--links">
                <h6 class="fs-20 lh-28 fw-500 mb-4"><?php print $header ?></h6>

                <div class="footer-col--links-wrapper">
                    <?php foreach($links as $link => $href): ?>
                        <a class="link link-secondary fw-400 mx-lg-0 mx-auto" href="<?php print $href ?>"><?php print $link ?></a>
                    <?php endforeach ?>
                </div>
            </section>
        <?php endforeach ?>

        <section class="col-lg-3 footer-col--links">
            <h6 class="fs-20 lh-28 fw-500 mb-4">Contact</h6>
            <div class="d-flex align-items-center justify-content-lg-start justify-content-center">
                <i class="square-24 mr-2"><img src="img/icons/email.svg" alt="Email" /></i>
                <span>info@fs-poster.com</span>
            </div>

            <div class="footer-social_links mt-5">
                <?php
                    $social_links = ["instagram" => "", "facebook" => "", "telegram" => "", "youtube" => ""];

                    foreach($social_links as $icon => $href):
                ?>
                    <a class="link" href="<?php print $href ?>" target="_blank">
                        <i><img data-svg="#2E3A59" src="img/icons/<?php print $icon ?>.svg" alt="<?php print $icon ?>" /></i>
                    </a>
                <?php endforeach ?>
            </div>
        </section>
    </div>

    <div class="row py-4 border-lg-none border-top border-catskill">
        <div class="col-12 text-center">
            <div class="d-inline-flex align-items-center">
                <i class="mr-2"><img src="img/icons/copyright.svg" alt="copyright" /></i>
                <span>FS Poster 2021. All Rights Reserved</span>
            </div>
        </div>
    </div>
</footer>

<?php require_once "includes/foot.php" ?>