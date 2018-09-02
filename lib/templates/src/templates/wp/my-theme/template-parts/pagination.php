<?php

/**
 *
 * Pagenation
 * @package Frontwork
 *
 */

if ($GLOBALS['wp_query']->max_num_pages === 1) {
  return;
}

$pages = paginate_links(array(
  'type' => 'array',
));

?>
<ul class="pagination">
  <?php foreach($pages as $page): ?>
    <?php if (strpos($page, 'current') !== false): ?>
      <li class="pagination__item is-current"><?php echo preg_replace('/ class=(\'|\")(.*?)(\'|\")/', '', $page); ?></li>
    <?php elseif (strpos($page, 'next') !== false): ?>
      <li class="pagination__item pagination__item--next"><?php echo preg_replace('/ class=(\'|\")(.*?)(\'|\")/', '', $page); ?></li>
    <?php elseif (strpos($page, 'prev') !== false): ?>
      <li class="pagination__item pagination__item--prev"><?php echo preg_replace('/ class=(\'|\")(.*?)(\'|\")/', '', $page); ?></li>
    <?php else: ?>
      <li class="pagination__item"><?php echo preg_replace('/ class=(\'|\")(.*?)(\'|\")/', '', $page); ?></li>
    <?php endif; ?>
 <?php endforeach; ?>
</ul>
