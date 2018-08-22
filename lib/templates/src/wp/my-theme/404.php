<?php get_header(); ?>

	<div class="bggr" id="bggr">
		<div class="contents" role="main">
			<div class="mainimgTop">
				<h1>404 Not Found</h1>
			</div>
			<div class="crumb"><a href="<?php echo get_bloginfo('url'); ?>">HOME</a>&nbsp;&nbsp;&gt;&nbsp;&nbsp;ページが見つかりません</div>
			<div class="contentsPage">
				<div class="cf mb90">
					申し訳ございません。<br />
					アクセスしようとしたページが見つかりませんでした。<br />
					アドレスが変更になっているか、削除された可能性があります。<br />
					お手数ですが、下記リンクより目的のページをお探しください。<br />
					<br />
					<a class="icon01" href="<?php echo get_bloginfo('url'); ?>/">HOME</a><br />
					<a class="icon01" href="<?php echo get_bloginfo('url'); ?>/sitemap/">サイトマップ</a>
				</div>
			</div>
		</div>
	</div>

<?php get_footer(); ?>
