<?php get_header(); ?>

	<div class="bggr" id="bggr">
		<div class="mainboxOut"><div class="mainbox">
			<ul class="mainimg">
				<?php
				global $AdwillSlide;
                $args = array(
                    'force_no_custom_order' => true,
                    'post_type' => AdwillSlide::getPluginID(),
                    'tax_query' => array(
                        array(
                            'taxonomy' => AdwillSlide::getPluginID(),
                            'field'    => 'slug',
                            'terms'    => 'b',
                        ),
                    ),
                    'nopaging' => true,
                    'post_status' => 'publish',
                    'suppress_filters' => 1,
                    'orderby' => 'menu_order',
                    'order' => 'ASC',
                );
                $the_query = new WP_Query( $args );
                if ( $the_query->have_posts() ) :
                    while ( $the_query->have_posts() ) :
                        $the_query->the_post();
						$meta = get_post_meta(get_the_ID(), AdwillSlide::getPluginID());
						$meta = $meta[0];
						$image = wp_get_attachment_image_src( $meta['image'], 'full');
						$image = $image[0];
				?>
				<li>
					<span><img src="<?php echo $image; ?>" alt="<?php echo $meta['alt']; ?>" /></span>
				</li>
				<?php endwhile; wp_reset_postdata(); endif; ?>
			</ul>
			<div class="mainbox-circle"><a class="pglnk" href="/aboutus/#show_space"><img src="<?php echo get_template_directory_uri(); ?>/img/main_btm.png" alt="庭政きらり" width="273" height="273"/></a></div>
		</div></div>
		<div id="tkBlock">
			<div id="tkBlockIn" class="cf">
				<div class="wn">庭政からのお知らせ</div>
				<div class="ticker" rel="roll">
					<ul>
						<?php
						$args = array(
		                    'force_no_custom_order' => true,
		                    'post_type' => 'post',
		                    'post_status' => 'publish',
		                    'posts_per_page' => 3,
		                );
		                $the_query = new WP_Query( $args );
		                if ( $the_query->have_posts() ) :
                    		while ( $the_query->have_posts() ) : $the_query->the_post();
		                ?>
						<li>
							<span class="style-<?php $cat = get_the_category(); echo $cat[0]->slug; ?>"><?php $cat = get_the_category(); echo $cat[0]->cat_name; ?></span>
							<p><?php the_time('Y.m.d'); ?></p>
							<?php if ( get_the_content() === '' && get_field('url') === '' ): ?>
								<?php the_title(); ?>
							<?php else: ?>
								<?php if ( get_field('url') === '' ): ?>
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								<?php else: ?>
									<a class="pglnk" href="<?php echo get_field('url'); ?>" <?php if ( get_field('blank') ) { echo 'target="_blank"'; } ?>><?php the_title(); ?></a>
								<?php endif; ?>
							<?php endif; ?>
						</li>
		            	<?php endwhile; wp_reset_postdata(); endif; ?>
					</ul>
				</div>
			</div>
		</div>
		<div class="contentsPage">
			<div class="cf mb20">
				<div class="boxL">
					<div class="sp_banner">
						<a href="<?php echo get_bloginfo('url'); ?>/aboutus/">
							<img src="<?php echo get_template_directory_uri(); ?>/img/sp_banner.jpg" alt="庭政きらり" />
						</a>
					</div>
					<h2>こころみたされる庭造り</h2>
					本格日本庭園から、現代建築に似合うスタイリッシュなガーデニングまで、<span><br></span>
					住まいのエクステリアをトータルコーディネートいたします。<br>
					暮らしを彩り、住まいを引き立て、<span><br></span>
					ご家族と共に成長する美しい庭造りは、<span><br></span>
					庭政にお任せください。
				</div>
				<div class="boxR">
					<img src="<?php echo get_template_directory_uri(); ?>/img/top_img01.jpg" alt="こころみたされる庭づくり" width="503" height="361"/>
				</div>
			</div>
			<p class="icon_title">和風庭園<span>から</span>洋風エクステリア<span>まで</span><br>幅広い実績<span>があります</span><span class="small">OUR WORKS</span></p>
		</div>
		<ul class="contents_WideNav cf">
			<?php
				$paged = get_query_var('paged');
				$args = array(
                    'post_type' => 'work_list',
                    'post_status' => 'publish',
                    'orderby' => 'date',
                    'order' => 'DESC',
                    'page' => 8,
                    'posts_per_page' => 8,
                );
                $the_query = new WP_Query( $args );
                if ( $the_query->have_posts() ):
                    while ( $the_query->have_posts() ): $the_query->the_post();
                    	$url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'work_th');
		        		$url = $url[0];
		        		
		        		$nameData = get_the_terms( get_the_ID(), 'work_type' );
		        		$nameData = $nameData[0];
		        		$slug = $nameData->slug;
		        		$name = $nameData->name;	
            ?>
            <li class="list-<?php echo $slug; ?>"><a href="<?php the_permalink(); ?>">
				<em></em>
				<div class="bg-icon"></div>
				<div><p class="title"><?php the_title(); ?><span><?php echo $name; ?></span></p></div>
				<img src="<?php echo $url; ?>" alt="<?php the_title(); ?>" />
			</a></li>
            <?php endwhile; endif; wp_reset_postdata(); ?>
		</ul>
		<?php get_template_part('part/pickup'); ?>
	</div>

<?php get_footer(); ?>