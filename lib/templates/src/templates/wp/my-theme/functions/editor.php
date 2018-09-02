<?php

/**
 *
 * Editor
 * @package Frontwork
 *
 */

/**
 *
 * エディタ用CSSの追加
 *
 */

add_action('after_setup_theme', function() {
  add_editor_style(array('/' . MT_ASSETS . '/' . MT_CSS . '/editor.css'));
});


/**
 *
 * エディタ用のクラスを追加
 *
 */

add_filter('tiny_mce_before_init', function($initArray){
  $initArray['body_class'] = 'editor-body';
  return $initArray;
}, 100);

/**
 *
 * 冒頭に<!--noautop-->がある場合、wpautop（自動整形機能 - pタグの自動追加など）を無効化
 *
 */

add_filter('the_content', function($content) {
  if (strpos($content, '<!--noautop-->') !== false) {
    remove_filter('the_content', 'wpautop');
    $content = preg_replace('/\s*\<!--noautop-->\s*(\r\n|\n|\r)?/u', '', $content);
  }
  return $content;
}, 1);

/**
 *
 * ビジュアルエディタの設定
 *
 */

add_filter('tiny_mce_before_init', function($initArray){
  global $allowedposttags;
  // 空タグ削除の無効化
  $initArray['verify_html'] = false;
  // すべてのタグと属性値を許可
  $initArray['valid_elements'] = '*[*]';
  // 既存設定に追加されているすべてのタグと属性値を許可
  $initArray['extended_valid_elements'] = '*[*]';
  // aタグに入るすべての要素を許可
  $initArray['valid_children'] = '+a[' . implode('|', array_keys($allowedposttags)) . ']';
  // インデントを許可
  $initArray['indent'] = true;
  // 改行後にpタグが挿入される機能を削除
  $initArray['force_p_newlines'] = false;
  return $initArray;
}, 100);
