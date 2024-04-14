<?php
/**
 * Plugin Name:       Todo List
 * Description:       A simple todo list block
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Gustavo Hilario
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       todo-list
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_boilerplate_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_boilerplate_block_init' );

// Load translations PHP
function blocks_course_load_translations( $mofile, $domain ) {
    if ( 'todo-list' === $domain && false !== strpos( $mofile, WP_LANG_DIR . '/plugins/' ) ) {
        $locale = apply_filters( 'plugin_locale', determine_locale(), $domain );
        $mofile = WP_PLUGIN_DIR . '/' . dirname( plugin_basename( __FILE__ ) ) . '/languages/' . $domain . '-' . $locale . '.mo';
    }
    return $mofile;
}
add_filter( 'load_textdomain_mofile', 'blocks_course_load_translations', 10, 2 );

function todo_list_set_translations() {
	// Loading our own JS translations
	// Thrid parameter is the path to the folder containing the translations
	// It could be empty if the translations are in the root of the plugin – WordPress Translations (Approved Plugin) 
	wp_set_script_translations( 'create-block-todo-list-editor-script', 'todo-list',  plugin_dir_path( __FILE__ ) . 'languages' );
}

add_action('init', 'todo_list_set_translations');

// Other Steps
// 1. Use CLI  to generate the pot file -- wp i18n make-pot ./ languages/todo-list.pot --exclude="src"
// 2. Create the .po and .mo files -- We can use an app like Poedit to create the .po and .mo files
// 3. Add the translations to the languages folder with the correct name -- e.g. es_ES.po and es_ES.mo
// 4. Json translations file -- Create a json file with the translations for the block -- wp i18n make-json ./ languages/todo-list-es_ES.po --no-purge

