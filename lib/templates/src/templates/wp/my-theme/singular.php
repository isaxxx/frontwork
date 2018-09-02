<?php

/**
 *
 * Singular
 * @package Frontwork
 *
 */

?><?php get_header(); ?>

<main class="l-cn" role="main">
  <div class="l-rw">
    <div class="l-cl">
      <?php while (have_posts()): the_post(); ?>
        <h1 class=""><?php the_title(); ?></h1>
        <img src="<?php echo mt_get_the_post_thumbnail_url(); ?>" alt="" />
        <?php if (is_page()): ?>
          <time class="" datetime="<?php echo get_the_date(DATE_W3C); ?>"><?php the_date(); ?></time>
        <?php endif; ?>
        <?php
          $category = get_the_category();
          if ($category) {
            echo '<p class="">';
            foreach($category as $cat) {
              echo '<a class="category category--' . $cat->slug . '" href="' . get_category_link($cat->term_id) . '">' . $cat->cat_name . '</a>';
            }
            echo '</p>';
          }
        ?>
        <?php
          $tags = get_the_tags();
          if ($tags) {
            echo '<p class="">';
            foreach($tags as $tag) {
              echo '<a class="tag tag--' . $tag->slug . '" href="' . get_tag_link($tag->term_id) . '">' . $tag->name . '</a>';
            }
            echo '</p>';
          }
        ?>
        <div class="">
          <?php the_content(); ?>
        </div>
      <?php endwhile; ?>
    </div>
  </div>
</main>

<?php get_footer(); ?>
