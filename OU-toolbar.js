jsonpToolbar({
    'html': '<div id="ouannotate-toolbar">\
\
	<div id="ouannotate-toolbar-inner-wrapper">\
\
		<div id="ouannotate-toolbar-logo"></div>\
\
		<div id="ouannotate-toolbar-close"><a></a></div>\
\
		<div id="ouannotate-toolbar-fields">\
\
		<div id="ouannotate-toolbar-securityID">\
			<input type="hidden" name="securityID">\
			</div>\
\
			<div id="ouannotate-toolbar-comment">\
				<textarea cols="38" rows="4" id="ouannotate-toolbar-comment-field"></textarea>\
			</div>\
\
			<div id="ouannotate-toolbar-visibility">\
				<select id="ouannotate-toolbar-visibility-field">\
					<option value="private">Private</option>\
					<option value="public">Public</option>\
				</select>\
			</div>\
\
			<div id="ouannotate-toolbar-tags">\
				<input id="ouannotate-toolbar-tags-field" type="text" value="Add tags" />\
			</div>\
\
			<div id="ouannotate-toolbar-highlight-colour">\
				<label>Highlighter</label>\
				<div id="ouannotate-toolbar-highlight-options">\
					<div class="ouannotate-toolbar-highlight-option" id="ouannotate-toolbar-highlight-option-yellow"><input type="radio" name="ouannotate-toolbar-highlight-colour" value="yellow" checked="checked" /></div>\
					<div class="ouannotate-toolbar-highlight-option" id="ouannotate-toolbar-highlight-option-red"><input type="radio" name="ouannotate-toolbar-highlight-colour" value="red" /></div>\
					<div class="ouannotate-toolbar-highlight-option" id="ouannotate-toolbar-highlight-option-blue"><input type="radio" name="ouannotate-toolbar-highlight-colour" value="blue" /></div>\
					<div class="ouannotate-toolbar-highlight-option" id="ouannotate-toolbar-highlight-option-transparent"><input type="radio" name="ouannotate-toolbar-highlight-colour" value="transparent" /></div>\
				</div>\
			</div>\
\
			<div id="ouannotate-toolbar-button">\
				<a class="ou-button" id="ouannotate-toolbar-submit">Button</a>\
			</div>\
\
		</div>\
\
		<div id="ouannotate-toolbar-filters">\
\
			<label id="ouannotate-toolbar-filters-label">Show annotations</label>\
\
			<div id="ouannotate-toolbar-filters-my" class="ouannotate-toolbar-filter">\
				<div class="ouannotate-field">\
					<input type="checkbox" />\
				</div>\
				<div class="ouannotate-icon"></div>\
				<label>My</label>\
			</div>\
\
			<div id="ouannotate-toolbar-filters-shared" class="ouannotate-toolbar-filter">\
				<div class="ouannotate-field">\
					<input type="checkbox" />\
				</div>\
				<div class="ouannotate-icon"></div>\
				<label>Shared</label>\
			</div>\
\
		</div>\
\
		<div id="ouannotate-toolbar-links">\
			<div id="ouannotate-toolbar-links-manage"><a>Manage&nbsp;annotations</a></div>\
			<div id="ouannotate-toolbar-links-help">\
				<a>Help using annotations<div id="ouannotate-toolbar-links-help-image">&nbsp;</div></a>\
			</div>\
		</div>\
	</div>\
</div>',
	'layout': {
		'components': {
			'SubmitButton': {
				'selectorText': '#ouannotate-toolbar-submit',
				'states': {
					'Save': {
						'addClasses': [ 'save' ],
						'removeClasses': [ 'bookmark', 'disabled' ],
						'setValue': 'Save'
					},
					'Bookmark': {
						'addClasses': [ 'bookmark' ],
						'removeClasses': [ 'save', 'disabled' ],
						'setValue': 'Bookmark'
					},
					'Disabled': {
						'addClasses': [ 'disabled', 'inactive' ],
						'removeClasses': [ 'active', 'bookmark', 'save' ],
						'setValue': 'Disabled'
					},
					'Inactive': {
						'addClasses': [ 'inactive' ],
						'removeClasses': [ 'active' ]
					},
					'Active': {
						'addClasses': [ 'active' ],
						'removeClasses': [ 'inactive' ]
					}
				}
			},
			'CommentField': {
				'selectorText': '#ouannotate-toolbar-comment-field'
			},
			'VisibilityField': {
				'selectorText': '#ouannotate-toolbar-visibility-field'
			},
			'TagsField': {
				'selectorText': '#ouannotate-toolbar-tags-field'
			},
			'HighlightColourField': {
				'selectorText': '#ouannotate-toolbar-highlight-options'
			},

			'MyCommentsFilterField': {
				'selectorText': '#ouannotate-toolbar-filters-my input'
			},
			'SharedCommentsFilterField': {
				'selectorText': '#ouannotate-toolbar-filters-shared input'
			},
			'ManagementLink': {
				'selectorText': '#ouannotate-toolbar-links-manage a'
			},
			'HelpLink': {
				'selectorText': '#ouannotate-toolbar-links-help a'
			},
			'CloseButton': {
				'selectorText': '#ouannotate-toolbar-close a'
			},
			'SecurityID': {
				'selectorText': '#ouannotate-toolbar-securityID input'
			}
		}
	}
});
