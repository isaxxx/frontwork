<?php

wp_enqueue_style('app', get_theme_file_path('/assets/css/app.css'), array(), wp_get_theme()->Version);
wp_enqueue_script('app', get_theme_file_path('/assets/js/app.js'), array(), wp_get_theme()->Version, false);
