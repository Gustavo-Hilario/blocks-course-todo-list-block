import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { CheckboxControl } from '@wordpress/components';
import './editor.scss';

export default function Edit() {
	const todos = useSelect( ( select ) => {
		const todosStore = select( 'blocks-course/todos' );
		return todosStore && todosStore.getTodos();
	}, [] );

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
				<ul>
					{ todos.map( ( todo ) => {
						return (
							<li
								key={ todo.id }
								className={ todo.completed && 'todo-completed' }
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
			) }
		</div>
	);
}
