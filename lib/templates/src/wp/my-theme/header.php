<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php wp_title(); ?></title>
    <meta name="keywords" content="<%= page.keywords %>" />
    <meta name="description" content="<%= page.description %>" />
    <meta property="og:title" content="<%= page.title %>" />
    <meta property="og:description" content="<%= page.description %>" />
    <meta property="og:type" content="<% if (page.currentHeader === 'home') { %>website<% } else { %>article<% } %>" />
    <meta property="og:image" content="<?php echo get_theme_file_path('/assets/images/og-image.png'); ?>" />
    <meta property="og:site_name" content="<%= common.siteName %>" />
    <meta name="format-detection" content="telephone=no, email=no, address=no" />
    <link rel="apple-touch-icon" href="<?php echo get_theme_file_path('/assets/images/apple-touch-icon.png'); ?>" />
    <link rel="shortcut icon" href="<?php echo get_theme_file_path('/assets/images/favicon.ico'); ?>" />
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="l-st">
      <header class="header" role="banner">
        <h1>Title</h1>
        <nav class="menu js-menu" id="menu" role="navigation">
          <ul class="js-menu__container">
            <li class="<% if (page.currentHeader === 'home') { %>is-current<% } %>">
              <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
            </li>
            <li class="<% if (page.currentHeader === 'about') { %>is-current<% } %>">
              <a href="<?php echo esc_url(home_url('/about/')); ?>">About</a>
            </li>
          </ul>
        </nav>
        <div class="js-menu-layer"></div>
        <a class="js-menu-switch" href="#" aria-controls="menu" aria-label="MENU">
          <i class="js-menu-switch__icon" aria-hidden="true"></i>
        </a>
      </header>
