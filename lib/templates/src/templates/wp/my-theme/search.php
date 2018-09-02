<?php

/**
 *
 * Search
 * @package Frontwork
 *
 */

?><?php get_header(); ?>

<main class="l-cn" role="main">
  <div class="l-rw">
    <div class="l-cl">
      <h1 class="">検索結果</h1>
      <div class="">
        <?php if (have_posts()): ?>
        <?php while (have_posts()): the_post(); ?>
          <div class="">
            <a class="" href="<?php the_permalink(); ?>">
              <h2 class=""><?php the_title(); ?></h4>
              <p class=""><?php the_excerpt(); ?></p>
            </a>
          </div>
        <?php endwhile; ?>
        <?php get_template_part('template-parts/pagination'); ?>
        <?php else: ?>
          <p>検索ワードに一致するページが見つかりませんでした。</p>
        <?php endif; ?>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>
