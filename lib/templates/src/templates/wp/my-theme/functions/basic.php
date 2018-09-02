<?php

/**
 *
 * Basic
 * @package Frontwork
 *
 */

/**
 *
 * 基本設定
 *
 */

add_action('after_setup_theme', function() {
  add_theme_support('automatic-feed-links');
  add_theme_support('html5', array(
    'search-form',
    'comment-form',
    'comment-list',
    'gallery',
    'caption',
  ));
  add_theme_support('post-thumbnails', array('post', 'page'));
  add_theme_support('customize-selective-refresh-widgets');
  add_image_size('og-image', 1200, 630, true);
  $GLOBALS['content_width'] = MT_CONTENT_SIZE_W;
  if (MT_UPDATE_IMAGE_SIZE) {
    update_option('thumbnail_size_w', MT_THUMBNAIL_SIZE_W);
    update_option('thumbnail_size_h', MT_THUMBNAIL_SIZE_H);
    update_option('thumbnail_crop', true);
    update_option('medium_size_w', MT_MEDIUM_SIZE_W);
    update_option('medium_size_h', MT_MEDIUM_SIZE_H);
    update_option('large_size_w', MT_LARGE_SIZE_W);
    update_option('large_size_h', MT_LARGE_SIZE_H);
  }
});
