<?php

/**
 *
 * Search Form
 * @package Frontwork
 *
 */

?>
<form class="" role="search" method="get" action="<?php echo home_url('/'); ?>">
	<input class="" type="search" placeholder="検索" value="<?php echo get_search_query(); ?>" name="s" />
	<button class="" type="submit">検索</button>
</form>
