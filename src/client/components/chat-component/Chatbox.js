import React from 'react';

export default ({ text, username, handleTextChange }) => {
	const messagechat = `Chat here... as ${username}`;

	return (
		<div className="row">
			<div className="chat-box__form">
				<input
					type="text"
					value={text}
					placeholder={messagechat}
					className="form-control chat-box__input"
					onChange={handleTextChange}
					onKeyDown={handleTextChange}
					required
				/>
			</div>
		</div>
	);
	};
