import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import { __ } from '@wordpress/i18n';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	title: __( 'Todo List', 'todo-list' ),
	description: __( 'A simple todo list block', 'todo-list' ),
	edit: Edit,
	save,
} );
