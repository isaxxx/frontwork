<?php

/**
 *
 * Sidebar
 * @package Frontwork
 *
 */

if (!is_active_sidebar('sidebar-1')) {
  return;
}

?>

<aside class="" role="complementary">
  <?php dynamic_sidebar('sidebar-1'); ?>
</aside>
