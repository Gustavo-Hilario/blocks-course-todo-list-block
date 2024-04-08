import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { CheckboxControl, TextControl, Button } from '@wordpress/components';
import './editor.scss';

export default function Edit() {
	const [ newTodo, setNewTodo ] = useState( '' );

	const todos = useSelect( ( select ) => {
		const todosStore = select( 'blocks-course/todos' );
		return todosStore && todosStore.getTodos();
	}, [] );

	const actions = useDispatch( 'blocks-course/todos' );
	const addTodo = actions && actions.addTodo;

	return (
		<div { ...useBlockProps() }>
			{ ! todos && (
				<p>
					{ __(
						'Please make sure your plugin is activated',
						'todo-list'
					) }
				</p>
			) }
			{ todos && (
				<>
					<ul>
						{ todos.map( ( todo ) => {
							return (
								<li
									key={ todo.id }
									className={
										todo.completed && 'todo-completed'
									}
								>
									<CheckboxControl
										label={ todo.title }
										checked={ todo.completed }
										onChange={ ( value ) => {
											// eslint-disable-next-line no-console
											console.log( value );
										} }
									/>
								</li>
							);
						} ) }
					</ul>
					<form
						className="addtodo-form"
						onSubmit={ ( ev ) => {
							ev.preventDefault();
							if ( addTodo ) {
								addTodo( { title: newTodo, completed: false } );
								setNewTodo( '' );
							}
						} }
					>
						<TextControl
							value={ newTodo }
							onChange={ ( value ) => setNewTodo( value ) }
						/>
						<Button type="submit" isPrimary>
							{ ' ' }
							{ __( 'Add Todo', 'todo-list' ) }{ ' ' }
						</Button>
					</form>
				</>
			) }
		</div>
	);
}
