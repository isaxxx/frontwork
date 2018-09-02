<?php

/**
 *
 * Header
 * @package Frontwork
 *
 */

?><!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo wp_get_document_title(); ?></title>
    <meta name="description" content="<?php echo mt_get_the_post_description(); ?>" />
    <meta property="og:title" content="<?php echo wp_get_document_title(); ?>" />
    <meta property="og:description" content="<?php echo mt_get_the_post_description(); ?>" />
    <meta property="og:type" content="<?php echo is_front_page() ? 'website' : 'article'; ?>" />
    <meta property="og:image" content="<?php echo mt_get_the_post_og_image_url(); ?>" />
    <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
    <meta name="format-detection" content="telephone=no, email=no, address=no" />
    <link rel="apple-touch-icon" href="<?php echo get_theme_file_path('/' . MT_ASSETS . '/' . MT_IMAGES . '/apple-touch-icon.png'); ?>" />
    <link rel="shortcut icon" href="<?php echo get_theme_file_path('/' . MT_ASSETS . '/' . MT_IMAGES . '/favicon.ico'); ?>" />
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="l-st">
      <header class="header" role="banner">
        <h1 class=""><?php bloginfo('name'); ?></h1>
        <nav class="menu js-menu" id="menu" role="navigation">
          <ul class="js-menu__container">
            <li class="<?php if (is_front_page()) { echo 'is-current'; } ?>">
              <a href="<?php echo home_url('/'); ?>">Home</a>
            </li>
            <li class="<?php if (is_page('about')) { echo 'is-current'; } ?>">
              <a href="<?php echo home_url('/about/'); ?>">About</a>
            </li>
          </ul>
        </nav>
        <div class="js-menu-layer"></div>
        <a class="js-menu-switch" href="#" aria-controls="menu" aria-label="MENU">
          <i class="js-menu-switch__icon" aria-hidden="true"></i>
        </a>
      </header>
