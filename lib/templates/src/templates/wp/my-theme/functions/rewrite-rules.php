<?php

/**
 *
 * Rewrite Rules
 * @package Frontwork
 *
 */

/**
 *
 * 投稿一覧のあるディレクトリ名を変更する
 * ※「設定」→「パーマリンク設定」の共通設定を数字ベースに変更する必要あり
 *
 */

add_filter('register_post_type_args', function($args, $post_type) {
  if ($post_type === 'post') {
    global $wp_rewrite;
    $archive_slug = MT_ARCHIVES;
    $args['has_archive'] = $archive_slug;
    $archive_slug = $wp_rewrite->root.$archive_slug;
    $feeds = '(' . trim( implode('|', $wp_rewrite->feeds) ) . ')';
    add_rewrite_rule("{$archive_slug}/?$", "index.php?post_type={$post_type}", 'top');
    add_rewrite_rule("{$archive_slug}/feed/{$feeds}/?$", "index.php?post_type={$post_type}".'&feed=$matches[1]', 'top');
    add_rewrite_rule("{$archive_slug}/{$feeds}/?$", "index.php?post_type={$post_type}".'&feed=$matches[1]', 'top');
    add_rewrite_rule("{$archive_slug}/{$wp_rewrite->pagination_base}/([0-9]{1,})/?$", "index.php?post_type={$post_type}".'&paged=$matches[1]', 'top');
  }
  return $args;
}, 10, 2);
