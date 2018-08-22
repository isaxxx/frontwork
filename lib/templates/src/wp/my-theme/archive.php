<?php get_header(); ?>

	<div class="bggr" id="bggr">
		<div class="contents" role="main">
			<div class="mainimgTop">
				<h1><?php output_whatsnew_title(); ?></h1>
			</div>
			<div class="crumb"><a href="<?php echo get_bloginfo('url'); ?>">HOME</a>&nbsp;&nbsp;&gt;&nbsp;&nbsp;<?php output_whatsnew_crumb(); ?></div>
			<div class="contentsPage cf">
				<div class="contentsMain">
					<?php if ( have_posts() ) :  ?>
						<?php while ( have_posts() ) : the_post(); ?>
							<dl>
								<dt><span class="cate-<?php $cat = get_the_category(); echo $cat[0]->slug; ?>"><?php $cat = get_the_category(); echo $cat[0]->cat_name; ?></span><?php the_time('Y.m.d'); ?></dt>
								<dd>
									<?php if ( get_the_content() === '' && get_field('url') === '' ): ?>
										<?php the_title(); ?>
									<?php else: ?>
										<?php if ( get_field('url') === '' ): ?>
											<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
										<?php else: ?>
											<a class="pglnk" href="<?php echo get_field('url'); ?>" <?php if ( get_field('blank') ) { echo 'target="_blank"'; } ?>><?php the_title(); ?></a>
										<?php endif; ?>
									<?php endif; ?>
								</dd>
							</dl>
						<?php endwhile; ?>
					<?php else :  ?>
						<p>記事がありません。</p>
					<?php endif;  ?>
					<div class="pagenate">
						<?php echo paginate_links(array(
							'prev_next' => false,
						)); ?>
					</div>
				</div>
				<?php get_template_part('part/sidemenu'); ?>
			</div>
			<?php get_template_part('part/pickup'); ?>
		</div>
	</div>

<?php get_footer(); ?>
