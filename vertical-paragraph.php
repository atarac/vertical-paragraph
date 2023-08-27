<?php
/**
 * Plugin Name:       Vertical Paragraph
 * Description:       Create vertical paragraph.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Pink Freak
 * Author URI:        https://pink-freak.com/
 * License:           GPL-2.0-or-later
 * Text Domain:       vertical-paragraph
 */
 
function vertical_paragraph_enqueue() {
  //依存スクリプトの配列とバージョンが記述された index.asset.php をインクルード
  $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
  
  //ブロック用のスクリプト build/index.js を登録
  wp_register_script(
    'vertical-paragraph-script',
    plugins_url( 'build/index.js', __FILE__ ),
    $asset_file['dependencies'], //依存スクリプトの配列
    $asset_file['version'] //バージョン
  );

  //フロント用スタイル
  wp_register_style(
    'vertical-paragraph-style',
    plugins_url( 'build/style-index.css', __FILE__ ),
    array(),
    filemtime( plugin_dir_path( __FILE__ ) . 'build/style-index.css' )
  );

  //エディター用スタイル
  wp_register_style(
    'vertical-paragraph-editor-style',
    plugins_url( 'build/index.css', __FILE__ ),
    array(),
    filemtime( plugin_dir_path( __FILE__ ) . 'build/index.css' )
  );
  
  //ブロックタイプの登録
  register_block_type( 
    'pf/vertical-paragraph',
    array(
      //エディター用スクリプトにブロック用スクリプトのハンドル名を指定して関連付け
      'editor_script' => 'vertical-paragraph-script',
      'editor_style' => 'vertical-paragraph-editor-style',
      'style' => 'vertical-paragraph-style',
    ) 
  );
}
add_action( 'init', 'vertical_paragraph_enqueue' );