<?php

/**
 *
 * Front Page
 * @package Frontwork
 *
 */

?><?php get_header(); ?>

<main class="l-cn" role="main">
  <div class="l-rw">
    <div class="l-cl">
      <h3 class="">投稿</h3>
      <div class="">
        <?php while (have_posts()): the_post(); ?>
          <article class="">
            <a class="" href="<?php the_permalink(); ?>">
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
              <h4 class=""><?php the_title(); ?></h4>
            </a>
          </article>
        <?php endwhile; ?>
      </div>
      <div class="h-tc">
        <a class="" href="<?php echo home_url('/archives/'); ?>">投稿一覧</a>
      </div>

      <h3 class="">固定ページ</h3>
      <div class="">
        <?php
          $the_query = new WP_Query(array(
            'paged' => get_query_var('paged') ? get_query_var('paged') : 1,
            'post_type' => array('page'),
            'posts_per_page' => 5,
            'post_parent' => get_page_by_path('about')->ID,
          ));
          if ($the_query->have_posts()):
            while ($the_query->have_posts()):
              $the_query->the_post();
        ?>
          <section class="">
            <a class="" href="<?php the_permalink(); ?>">
              <img src="<?php echo mt_get_the_post_thumbnail_url(); ?>" alt="" />
              <h4 class=""><?php the_title(); ?></h4>
              <p class=""><?php the_excerpt(); ?></p>
            </a>
          </section>
        <?php
            endwhile;
            wp_reset_postdata();
          endif;
        ?>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>
