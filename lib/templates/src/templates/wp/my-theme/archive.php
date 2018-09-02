<?php

/**
 *
 * Index
 * @package Frontwork
 *
 */

?><?php get_header(); ?>

<main class="l-cn" role="main">
  <div class="l-rw">
    <div class="l-cl">
      <h1 class="">投稿一覧</h1>
      <div class="">
        <?php while (have_posts()): the_post(); ?>
          <article class="">
            <a href="<?php the_permalink(); ?>">
              <img src="<?php echo mt_get_the_post_thumbnail_url(); ?>" alt="" />
              <time class="" datetime="<?php echo get_the_date(DATE_W3C); ?>"><?php the_date(); ?></time>
              <?php
                $category = get_the_category();
                if ($category) {
                  echo '<p class="">';
                  foreach($category as $cat) {
                    echo '<span class="category category--' . $cat->slug . '">' . $cat->cat_name . '</span>';
                  }
                  echo '</p>';
                }
              ?>
              <h2 class=""><?php the_title(); ?></h2>
            </a>
          </article>
        <?php endwhile; ?>
        <?php get_template_part('template-parts/pagination'); ?>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>
