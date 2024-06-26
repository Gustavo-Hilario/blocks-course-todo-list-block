import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { CheckboxControl, TextControl, Button } from '@wordpress/components';
import './editor.scss';

export default function Edit() {
	const [ newTodo, setNewTodo ] = useState( '' );
	const [ addingTodo, setAddingTodo ] = useState( false );

	const todos = useSelect( ( select ) => {
		const todosStore = select( 'blocks-course/todos' );
		return todosStore && todosStore.getTodos();
	}, [] );

	const actions = useDispatch( 'blocks-course/todos' );
	const addTodo = actions && actions.addTodo;
	const toggleTodo = actions && actions.toggleTodo;

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
						{ todos.map( ( todo, index ) => {
							return (
								<li
									key={ todo.id }
									className={
										todo.completed && 'todo-completed'
									}
								>
									<CheckboxControl
										disable={ todo.loading }
										label={ todo.title }
										checked={ todo.completed }
										onChange={ () => {
											if ( toggleTodo ) {
												toggleTodo( todo, index );
											}
										} }
									/>
								</li>
							);
						} ) }
					</ul>
					<form
						className="addtodo-form"
						onSubmit={ async ( ev ) => {
							ev.preventDefault();
							if ( addTodo && newTodo ) {
								setAddingTodo( true );
								await addTodo( newTodo );
								setNewTodo( '' );
								setAddingTodo( false );
							}
						} }
					>
						<TextControl
							value={ newTodo }
							onChange={ ( value ) => setNewTodo( value ) }
						/>
						<Button disabled={ addingTodo } type="submit" isPrimary>
							{ ' ' }
							{ __( 'Add Todo', 'todo-list' ) }{ ' ' }
						</Button>
					</form>
				</>
			) }
		</div>
	);
}
