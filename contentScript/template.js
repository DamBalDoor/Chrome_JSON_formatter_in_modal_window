const modalHtml = `<div id="jsonFormatterModal"json-formatter-modal="1">
		<div class="jsonFormatterModalMask"></div>
		<div class="jsonFormatterModalWrapper">
			<div class="jsonFormatterModalContent">
				<div class="jsonFormatterModalHeader">
					<span class="jsonFormatterModalThemeToggle" title="Сменить тему">🌓</span>
					<span class="jsonFormatterModalCopyBtn" title="Скопировать JSON">📋</span>
					<span class="jsonFormatterModalCloseModal" title="Закрыть">×</span>
				</div>
				<div class="jsonFormatterModalText"></div>
			</div>
		</div>
	</div>
`;



const modalStyleHtml = `
	body {
		height: 100%;
		overflow: hidden;
	}
	
	#jsonFormatterModal {
		line-height: 18px !important;
		font-family: sans-serif !important;
		text-align: left;
		font-size: 14px;
		word-break: break-word;
	}
	
	#jsonFormatterModal .jsonFormatterModalCopyBtn {
		margin-right: 10px;
		font-size: 18px;
		cursor: pointer;
		user-select: none;
	}
	
	#jsonFormatterModal *, #jsonFormatterModal *::before, #jsonFormatterModal *::after {
	  box-sizing: border-box;
	}
	
	#jsonFormatterModal div {
		display: block !important;
		margin: 0;
		padding: 0;
	}
	
	#jsonFormatterModal span {
		margin: 0;
		padding: 0;
	}
	
	#jsonFormatterModal span {
		display: inline !important;
	}
	
	#jsonFormatterModal .jsonFormatterModalMask,
	#jsonFormatterModal .jsonFormatterModalWrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10000;
		width: 100%;
		height: 100%;
	}
	
	#jsonFormatterModal .jsonFormatterModalMask {
		background-color: rgba(0, 0, 0, 0.45);
	}
	
	#jsonFormatterModal .jsonFormatterModalWrapper {
		overflow: auto;
	}
	
	#jsonFormatterModal .jsonFormatterModalContent {
		width: 50%;
		min-width: 300px;
		max-height: 85%;
		overflow-y: auto;
		margin: 10vh auto 20px;
		border-radius: 6px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.2);
		background-color: var(--bg-color);
		color: var(--text-color);
	}
	
	#jsonFormatterModal .jsonFormatterModalHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		font-size: 16px;
		border-bottom: 1px solid var(--border-color);
	}
	
	#jsonFormatterModal .jsonFormatterModalCloseModal,
	#jsonFormatterModal .jsonFormatterModalThemeToggle {
		cursor: pointer;
		user-select: none;
	}
	
	#jsonFormatterModal .jsonFormatterModalContent .jsonFormatterModalHeader {
		height: 30px;
	}
	
	#jsonFormatterModal .jsonFormatterModalContent .jsonFormatterModalCloseModal {
		float: right;
		width: 40px;
		height: 100%;
		text-align: center;
		font-size: 24px;
		user-select: none;
		cursor: pointer;
	}
	
	#jsonFormatterModal .jsonFormatterModalContent .jsonFormatterModalText {
		padding: 0 10px 10px 10px;
	}
	
	#jsonFormatterModal span.jsonFormatterModalEllipsis {
		display: none !important;
		user-select: none;
	}
	
	#jsonFormatterModal .jsonFormatterModalExpandedBlock {
		padding-left: 24px;
		border-left: 1px dotted #bbb;
	}
	
	#jsonFormatterModal .jsonFormatterModalObjContainer.folded .jsonFormatterModalExpandedBlock {
		display: none !important;
		padding-left: 24px;
	}
	
	#jsonFormatterModal .jsonFormatterModalObjContainer.folded span.jsonFormatterModalEllipsis {
		display: inline !important;
	}
	
	#jsonFormatterModal .jsonFormatterModalObjContainer {
		padding-left: 24px;
		margin-left: -24px;
		position: relative;
	}
	
	#jsonFormatterModal .jsonFormatterModalToggleExpandBtn {
		position: absolute;
		width: 0;
		height: 0;
		top: 6px;
		left: 6px;
		border-width: 8px;
		border-style: solid;
		border-bottom: none;
		border-color: #999 transparent transparent transparent;
		cursor: pointer;
		user-select: none;
	}
	
	#jsonFormatterModal .jsonFormatterModalObjContainer.folded .jsonFormatterModalToggleExpandBtn {
		transform: rotate(-90deg);
		transform-origin: 50%;
	}
	
	#jsonFormatterModal .stringVal {
		color: var(--string-color);
	}
	#jsonFormatterModal .otherVal {
		color: var(--other-color);
		font-weight: bold;
	}
	
	/* Theming */
	#jsonFormatterModal.light {
		--bg-color: #ffffff;
		--text-color: #000000;
		--border-color: #e0e0e0;
		--string-color: #0B7500;
		--other-color: #1A01CC;
	}
	#jsonFormatterModal.dark {
		--bg-color: #1e1e1e;
		--text-color: #f0f0f0;
		--border-color: #444;
		--string-color: #6FCF97;
		--other-color: #86C2FF;
	}
`;

const switchHtml = `<div class="switchComp">Turn On/Off:<span class="toggleFormatBtn"></span></div>`;

const switchStyleHtml = `body{position:relative;height:auto;overflow-x:auto;overflow-y:scroll;}pre{padding-top:35px;}.toggleFormatBtn{display:inline-block;width:48px;min-width:40px;height:24px;margin-left:10px;outline:none;border:none;padding:0;border-radius:12px;background-color:#409eff;position:relative;transition:all 0.2s;-webkit-transition:all 0.2s;cursor:pointer;user-select:none;-moz-user-select:none;-ms-user-select:none;}.toggleFormatBtn::after{content:"";position:absolute;top:2px;right:2px;width:20px;height:20px;border-radius:20px;background-color:#fff;transition:all 0.2s;-webkit-transition:all 0.2s;}.toggleFormatBtn.off{background-color:#b7b7b7;}.toggleFormatBtn.off::after{right:100%;transform:translateX(100%);margin-right:-2px;}.switchComp{display:flex;align-items:center;font-size:14px;position:absolute;top:0px;right:10px;user-select:none;font-weight:bolder;}.hidden{display:none !important;}.xhrFormatDiv{padding-top:6px;}`;
