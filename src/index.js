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
				'それほど昔のことでは<br>ありません。その名は<br>忘れましたが、ラ・マ<br>ンチャ地方のある村に、<br>槍立て台に槍、古い盾、<br>痩せ馬と猟犬と住むよ<br>うな型通りの郷士がお<br>りました。'
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
