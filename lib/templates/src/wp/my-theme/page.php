<?php get_header(); ?>
<?php My_Theme_Content::start(); ?>

<?php My_Theme_Loop::make_single( function(){ ?>
<div class="entry">
	<?php edit_post_link('この記事を編集する'); ?>
	<p class="entry__date"><time><?php the_time('Y年m月d日'); ?></time></p>
	<h1 class="entry__title"><?php the_title(); ?></h1>
	<?php My_Theme_Loop::the_post_thumbnail( 'large', 'entry__image' ); ?>
	<div class="entry__content"><?php the_content(); ?></div>
</div>
<?php }); ?>

<?php My_Theme_Content::end(); ?>
<?php get_footer(); ?>