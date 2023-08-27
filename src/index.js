/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	example: {
		attributes: {
			content: __(
				'このように<br>縦書きのブロック'
			),
		},
	},
	__experimentalLabel( attributes, { context } ) {
		if ( context === 'accessibility' ) {
			const { content } = attributes;
			return ! content || content.length === 0 ? __( 'Empty' ) : content;
		}
	},
	transforms,
	deprecated,
	merge( attributes, attributesToMerge ) {
		return {
			content:
				( attributes.content || '' ) +
				( attributesToMerge.content || '' ),
		};
	},
	edit,
	save,
};

registerBlockType( name, { ...metadata, ...settings} );
