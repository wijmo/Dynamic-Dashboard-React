import * as React from 'react';
export const Tile = ({ header, content, index, onRemove }) => (<div className="tile" draggable={true}>
		<div className="tile-container">
			<div className="tile-header">{header}</div>
			<div className="buttons">
				<div className="button" title="Close Tile" onClick={() => onRemove(index)}>
					<svg width="24" height="24" viewBox="0 0 24 24">
						<path d="M12.71,12l4.64-4.65a.49.49,0,1,0-.7-.7L12,11.29,7.35,6.65a.49.49,0,0,0-.7.7L11.29,12,6.65,16.65a.48.48,0,0,0,0,.7.48.48,0,0,0,.7,0L12,12.71l4.65,4.64a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7Z"/>
					</svg>
				</div>
			</div>
		</div>
		<div className="tile-content">{content}</div>
	</div>);
