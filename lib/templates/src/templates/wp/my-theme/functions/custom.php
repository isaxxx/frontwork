<?php

/**
 *
 * Custom
 * @package Frontwork
 *
 */

/**
 *
 * ウィジェットエリアの追加
 *
 */

add_action('widgets_init', function() {
  register_sidebar(array(
    'name'          => 'ウィジェットエリア１',
    'id'            => 'sidebar-1',
    'description'   => '画像ウィジェットからバナーを追加してください。',
    'before_widget' => '<section id="%1$s" class="widget %2$s">',
    'after_widget'  => '</section>',
    'before_title'  => '<h2 class="widget__title">',
    'after_title'   => '</h2>',
  ));
});
