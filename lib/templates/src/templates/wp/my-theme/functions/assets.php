<?php

/**
 *
 * Assets
 * @package Frontwork
 *
 */

/**
 *
 * CSSとJavaScriptの追加
 *
 */

add_action('wp_enqueue_scripts', function(){
  wp_enqueue_style('app', get_theme_file_path('/' . MT_ASSETS . '/' . MT_CSS . '/app.css'), array(), wp_get_theme()->Version);
  wp_enqueue_script('app', get_theme_file_path('/' . MT_ASSETS . '/' . MT_JS . '/app.js'), array(), wp_get_theme()->Version, false);
});
