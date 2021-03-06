<?php

/**
 *
 * Footer
 * @package Frontwork
 *
 */

?>
      <?php get_sidebar(); ?>
      <footer class="footer" role="contentinfo">
        <?php get_search_form(); ?>
        <p class="copyright">
          <small>&copy;&nbsp;Masahide&nbsp;Isaka</small>
        </p>
      </footer>
      <noscript class="h-np">
        <!-- この文字列が表示されている場合、ブラウザがHTMLの処理に失敗しています。<br />お手数ですがページの再読み込みを実行してください。 -->
        <div>お使いのブラウザはJavaScriptに対応していないか、または無効になっています。<br />ブラウザのJavaScriptの設定を有効にしてご利用ください。</div>
      </noscript>
    </div>
    <?php wp_footer(); ?>
  </body>
</html>
