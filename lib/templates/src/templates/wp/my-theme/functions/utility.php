<?php

/**
 *
 * Utility
 * @package Frontwork
 *
 */

/**
 *
 * ループ外で記事IDを取得する
 *
 */

function mt_get_the_post_id() {
  if (in_the_loop()) {
    return get_the_ID();
  } else {
    global $wp_query;
    return $wp_query->get_queried_object_id();
  }
}

/**
 *
 * metaタグのdescriptionを取得する
 *
 */

function mt_get_the_post_description($default_description = '') {
  if ($default_description === '') {
    $default_description = get_bloginfo('description');
  }
  if (is_singular()) {
    return get_the_excerpt(mt_get_the_post_id()) || $default_description;
  } else if (is_archive()) {
    return get_the_archive_description() || $default_description;
  } else {
    return $default_description;
  }
}

/**
 *
 * OGP画像のURLを取得する
 *
 */

function mt_get_the_post_og_image_url($default_image_url = '', $size = 'og-image') {
  if ($default_image_url === '') {
    $default_image_url = get_theme_file_path('/' . MT_ASSETS . '/' . MT_IMAGES . '/og-image.png');
  }
  if (is_singular()) {
    return get_the_post_thumbnail_url(mt_get_the_post_id(), $size) || $default_image_url;
  } else {
    return $default_image_url;
  }
}

/**
 *
 * ループ内でアイキャッチ画像のURLを取得する
 *
 */

function mt_get_the_post_thumbnail_url($default_image_url = '', $size = 'post-thumbnail') {
  if ($default_image_url === '') {
    $default_image_url = get_theme_file_path('/' . MT_ASSETS . '/' . MT_IMAGES . '/no-image.jpg');
  }
  if (has_post_thumbnail() && !post_password_required()) {
    return get_the_post_thumbnail_url(mt_get_the_post_id(), $size);
  } else {
    return $default_image_url;
  }
}
